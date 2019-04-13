class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.myaxios = axios.create({
      baseURL: this.BASE_URL
    });
  }

  getFullList() {
    this.myaxios.get(`/characters`).then(res =>
      res.data.forEach(character => {
        createCard(
          character.name,
          character.occupation,
          character.weapon,
          character.cartoon
        );
      })
    );
  }

  getOneRegister(id) {
    this.myaxios.get(`/characters/${id}`).then(res => {
      createCard(
        res.data.name,
        res.data.occupation,
        res.data.weapon,
        res.data.cartoon
      );
    });
  }

  createOneRegister(name, occupation, weapon, cartoon) {
    let newCharacter = {
      name: name,
      occupation: occupation,
      weapon: weapon,
      cartoon: cartoon
    };

    this.myaxios.post(`/characters`, newCharacter)
      .then(() => {
        $("#send-data").css("background-color", "green");
        this.getFullList();
      })
      .catch(err => {
        $("#send-data").css("background-color", "red");
        console.log(err);
      });
  }

  updateOneRegister(id, name, occupation, weapon, cartoon) {
    let character = {
      name: name,
      occupation: occupation,
      weapon: weapon,
      cartoon: cartoon
    };

    this.myaxios.patch(`/characters/${id}`, character)
      .then(() => {
        $("#send-data").last().css("background-color", "green");
        this.getFullList();
      })
      .catch(err => {
        $("#send-data").last().css("background-color", "red");
        console.log(err);
      });
  }

  deleteOneRegister(id) {
    this.myaxios
      .delete(`/characters/${id}`)
      .then(() => {
        $("#delete-one").css("background-color", "green");
        this.getFullList();
      })
      .catch(() => {
        $("#delete-one").css("background-color", "red");
      });
  }
}