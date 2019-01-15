import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    name: "",
    description: "",
    skills: "",
    format: "",
    employment: { full: false, part: false, project: false, training: false },
    link: "",
    address: "",
    from: "",
    to: "",
    contacts: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    return axios.post("/post", this.transformToString(this.state));
  };

  transformToString(state) {
    let divider = "\n===============\n";
    let skills = state.skills.split(" ").join(", ");
    let salary = `от ${state.from} до ${state.to}`;
    let employment = Object.keys(state.employment)
      .filter(key => {
        return state.employment[key];
      })
      .map(key => state.employment[key])
      .join(", ");
    let message =
      state.name +
      divider +
      state.description +
      divider +
      skills +
      divider +
      state.format +
      divider +
      (state.address ? state.address + divider : divider) +
      employment +
      divider +
      (state.link ? state.link + divider : divider) +
      salary +
      divider +
      state.contacts;

    return message;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.currentTarget.value
    });
  };

  handleCheck = event => {
    this.setState({
      employment: {
        ...this.state.employment,
        [event.target.name]: event.target.checked
      }
    });
  };

  render() {
    return (
      <div className="container col-md-5 col-sm-6 col-xs-8">
        <h1 className="title">Анкета на вакансию</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="name">
              Название компании
            </label>
            <input
              type="text"
              className="form-control col-sm-9"
              id="name"
              required
              onChange={this.handleChange("name")}
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание вакансии</label>
            <textarea
              className="form-control"
              id="description"
              rows="6"
              required
              onChange={this.handleChange("description")}
              value={this.state.description}
            />
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="skills">
              Технологии
            </label>
            <div className="col-sm-9 d-flex flex-column">
              <input
                type="text"
                className="form-control"
                id="skills"
                required
                onChange={this.handleChange("skills")}
                value={this.state.skills}
              />
              <small id="skillsHelp" className="text-muted">
                слова через пробел
              </small>
            </div>
          </div>

          <div className="form-row">
            <label className="col-sm-3" htmlFor="employment">
              Формат работы
            </label>
            <select
              value={this.state.format}
              className="form-control col-sm-3"
              id="format"
              onChange={this.handleChange("format")}
            >
              <option value="">--</option>
              <option value="офис">офис</option>
              <option value="удаленка">удаленка</option>
            </select>
          </div>

          <div className="form-group" required>
            <label className="col-form-label">Занятость</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.state.employment.full}
                onChange={this.handleCheck}
                name="full"
                id="full"
              />
              <label className="form-check-label" htmlFor="full">
                полная
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.state.employment.part}
                id="part"
                name="part"
                onChange={this.handleCheck}
              />
              <label className="form-check-label" htmlFor="part">
                частичная
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.state.employment.project}
                onChange={this.handleCheck}
                name="project"
                id="project"
              />
              <label className="form-check-label" htmlFor="project">
                проектная
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.state.employment.training}
                onChange={this.handleCheck}
                name="training"
                id="training"
              />
              <label className="form-check-label" htmlFor="training">
                стажировка
              </label>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="link">
              Ссылка на вакансию
            </label>
            <input
              type="text"
              className="form-control col-sm-9"
              id="link"
              onChange={this.handleChange("link")}
            />
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="address">
              Адрес офиса
            </label>
            <input
              type="text"
              className="form-control col-sm-9"
              id="address"
              onChange={this.handleChange("address")}
            />
          </div>

          <div className="form-group">
            <label className="col-form-label">Зарплатная вилка</label>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="from">
              от
            </label>

            <div className="col-sm-9 d-flex flex-column">
              <input
                type="number"
                className="form-control col-sm-9"
                id="from"
                required
                onChange={this.handleChange("from")}
              />
              <small className="text-muted">рублей</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="to">
              до
            </label>
            <div className="col-sm-9 d-flex flex-column">
              <input
                type="number"
                className="form-control col-sm-9"
                id="from"
                onChange={this.handleChange("to")}
                required
              />
              <small className="text-muted">рублей</small>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="contacts">
              Контакты
            </label>
            <input
              type="text"
              className="form-control col-sm-9"
              id="contacts"
              required
              onChange={this.handleChange("contacts")}
            />
          </div>

          <div className="submit-button d-flex justify-content-center">
            <button type="submit" className="btn btn-primary btn-lg">
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
