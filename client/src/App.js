import React from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

const Loader = () => (
  <div className="loader">
    <CircularProgress />
  </div>
);

const SubmitAlert = ({ open, closeDialog, text }) => (
  <Dialog
    open={open}
    onClose={closeDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle>{text}</DialogTitle>
  </Dialog>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      submit: false,
      error: false,
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
    this.closeDialog = this.closeDialog.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    return this.setState({ loading: true }, () => {
      axios
        .post("/post", this.transformToString(this.state), {
          headers: { "Content-Type": "text/plain" }
        })
        .then(response => {
          if (response.statusText === "OK") {
            this.setState({
              submit: true,
              loading: false
            });
          } else {
            this.setState({
              submit: true,
              error: true,
              loading: false
            });
          }
        });
    });
  };

  transformToString(state) {
    let divider = "\n===============\n";
    let skills = state.skills.split(" ").join(", ");
    let salary = `от ${state.from} до ${state.to}`;
    let employment = Object.keys(state.employment)
      .filter(key => {
        return state.employment[key];
      })
      // eslint-disable-next-line array-callback-return
      .map(key => {
        switch (key) {
          case "full":
            return "полная";
          case "part":
            return "частичная";
          case "project":
            return "проектная";
          case "training":
            return "стажировка";
          default:
            break;
        }
      })
      .join(", ");
    let message = [
      state.name,
      state.description,
      skills,
      state.format,
      state.address,
      employment,
      state.link,
      salary,
      state.contacts
    ].join(divider);

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

  closeDialog() {
    this.setState({
      loading: false,
      submit: false,
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
    });
  }

  render() {
    return (
      <>
        {this.state.loading ? <Loader /> : null}
        {this.state.error ? (
          <SubmitAlert
            open={this.state.submit}
            closeDialog={this.closeDialog}
            text="Что-то пошло не так..."
          />
        ) : (
          <SubmitAlert
            open={this.state.submit}
            closeDialog={this.closeDialog}
            text="Анкета опубликована в Krasnodar Dev Cereer"
          />
        )}

        <div className="container col-md-5 col-sm-6 col-xs-8">
          <h1 className="title">Анкета на вакансию</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label
                className="col-sm-3 col-form-label"
                htmlFor="name"
                required
              >
                Название компании
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  onChange={this.handleChange("name")}
                  value={this.state.name}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" required>
                Описание вакансии
              </label>
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
              <label
                className="col-sm-3 col-form-label"
                htmlFor="skills"
                required
              >
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
              <label className="col-form-label" required>
                Занятость
              </label>
              <div className="form-check" required>
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
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="link"
                  onChange={this.handleChange("link")}
                  value={this.state.link}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="address">
                Адрес офиса
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  onChange={this.handleChange("address")}
                  value={this.state.address}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="col-form-label">Зарплатная вилка</label>
            </div>
            <div className="form-group row">
              <label
                className="col-sm-3 col-form-label"
                htmlFor="from"
                required
              >
                от
              </label>

              <div className="col-sm-9 d-flex flex-column">
                <input
                  type="number"
                  className="form-control col-sm-9"
                  id="from"
                  required
                  onChange={this.handleChange("from")}
                  value={this.state.from}
                />
                <small className="text-muted">рублей</small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="to" required>
                до
              </label>
              <div className="col-sm-9 d-flex flex-column">
                <input
                  type="number"
                  className="form-control col-sm-9"
                  id="from"
                  onChange={this.handleChange("to")}
                  value={this.state.to}
                  required
                />
                <small className="text-muted">рублей</small>
              </div>
            </div>

            <div className="form-group row">
              <label
                className="col-sm-3 col-form-label"
                htmlFor="contacts"
                required
              >
                Контакты
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control "
                  id="contacts"
                  required
                  onChange={this.handleChange("contacts")}
                  value={this.state.contacts}
                />
              </div>
            </div>

            <div className="submit-button d-flex justify-content-center">
              <button type="submit" className="btn btn-primary btn-lg">
                Опубликовать
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default App;
