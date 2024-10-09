const axios = require("axios");

class CassidyBridge {
  constructor({
    url = "https://cassidybot.onrender.com",
    onGetAllData,
    onSetEachData,
    soloMode,
  }) {
    this.onGetAllData = onGetAllData;
    this.onSetEachData = onSetEachData;
    this.url = url;
    this.soloMode = soloMode;
  }
  goatbotKeys(triggerKey, noArgs = false) {
    const self = this;
    return {
      async onStart({ message, event, usersData, commandName, args }) {
        const cass = CassidyBridge.fromGoatBot({
          usersData,
          soloMode: self.soloMode,
        });
        const info = await cass.goatQuery(message, {
          ...event,
          body: `${triggerKey} ${noArgs ? "" : args.join(" ")}`,
        });
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          cass,
        });
      },
      async onReply({ Reply, message, event, commandName }) {
        const { cass } = Reply;
        const info = await cass.goatQuery(message, {
          ...event,
          body: `${event.body}`,
        });
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          cass,
        });
      },
    };
  }

  async sendQuery(event) {
    try {
      let databaseData = await this.onGetAllData();
      if (this.soloMode) {
        databaseData = { [event.senderID]: databaseData[event.senderID] };
      }
      const response = await axios.post(this.url + "/postNew", {
        ...event,
        localDB: true,
        databaseData,
      });

      const { status, modifiedData, result } = response.data;

      if (modifiedData) {
        await Promise.all(
          Object.keys(modifiedData).map((userID) =>
            this.onSetEachData(userID, modifiedData[userID]),
          ),
        );
      }

      return status === "success" ? result : null;
    } catch (error) {
      console.error("Error sending query:", error);
      throw error;
    }
  }
  async goatQuery(message, event) {
    const result = await this.sendQuery(event);
    if (!result) {
      return;
    }
    return await message[result.isReply ? "reply" : "send"](result.body);
  }
  async fcaQuery(api, event) {
    const result = await this.sendQuery(event);
    if (!result) {
      return;
    }
    return new Promise((r) => {
      api.sendMessage(
        result.body,
        event.threadID,
        (_, info) => r(info),
        result.isReply ? event.messageID : undefined,
      );
    });
  }

  static fromGoatBot({ usersData, ...etc }) {
    const onGetAllData = async () => {
      try {
        const allUsers = await usersData.getAll();
        return allUsers.reduce((resultData, { userID, name, data, money }) => {
          resultData[userID] = { name, ...data, money };
          return resultData;
        }, {});
      } catch (error) {
        console.error("Error getting all data:", error);
        throw error;
      }
    };

    const onSetEachData = async (userID, data) => {
      try {
        await usersData.set(userID, data, "data");
        await usersData.set(userID, {
          name: data.name,
          money: data.money,
        });
      } catch (error) {
        console.error(`Error setting data for user ${userID}:`, error);
        throw error;
      }
    };

    return new CassidyBridge({ ...etc, onGetAllData, onSetEachData });
  }
}

module.exports = CassidyBridge;
