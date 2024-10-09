const axios = require("axios");

class CassidyBridge {
  constructor({ url = "https://cassidybot.onrender.com", onGetAllData, onSetEachData }) {
    this.onGetAllData = onGetAllData;
    this.onSetEachData = onSetEachData;
    this.url = url;
  }

  async sendQuery(event) {
    try {
      const databaseData = await this.onGetAllData();
      const response = await axios.get(this.url + "/postWReply", {
        params: { ...event, localDB: true, databaseData },
      });

      const { status, modifiedData, result } = response.data;

      if (modifiedData) {
        await Promise.all(Object.keys(modifiedData).map(userID =>
          this.onSetEachData(userID, modifiedData[userID])
        ));
      }

      return status === "success" ? result : null;
    } catch (error) {
      console.error("Error sending query:", error);
      return null;
    }
  }
  async goatQuery(message, event) {
    const result = await this.sendQuery(event);
    return await message[result.isReply ? "reply" : "send"](result.body);
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
        return {};
      }
    }

    const onSetEachData = async (userID, data) => {
      try {
        await usersData.set(userID, data, "data");
        await usersData.set(userID, {
          name: data.name,
          money: data.money,
        });
      } catch (error) {
        console.error(`Error setting data for user ${userID}:`, error);
      }
    }

    return new CassidyBridge({ ...etc, onGetAllData, onSetEachData });
  }
}

module.exports = CassidyBridge;