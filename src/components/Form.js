import React, { useState } from "react"
import {
  Container,
  TextField,
  Paper,
  Grid,
  FormControl,
  Switch,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Typography,
  Chip,
  Button,
  IconButton,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"

const copy = (val) => JSON.parse(JSON.stringify(val))

const frameworks = {
  javascript: ["NodeJS", "React", "Angular", "Vue", "express", "NestJS"],
  java: ["JSP", "Spring", "SpringBoot", "JSF", "Hibernate", "JUnit", "Spock"],
  python: [
    "Python 3.x",
    "Python 2.x",
    "Django",
    "Flask",
    "SQLAlchemy",
    "Machine Learning",
  ],
  php: ["Symfony", "Zend", "Laravel", "PHP 7", "PHP 5", "Wordpress", "Magento"],
  "c#": [".Net", "Entity Framework", "ASP.NET", "WPF", "UWP"],
  "databases, cloud, git": [
    "Redis",
    "RabbitMQ",
    "Docker",
    "MongoDB",
    "MySQL",
    "Kubernetes",
    "AWS",
    "Azure",
    "Microservice Architecture",
    "PostgreSQL",
    "Git",
    "SVN",
  ],
}
const skillLanguage = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"]

const initialFields = {
  programingLanguages: [],
  languages: [{ language: "", skill: "" }],
  name: "",
  surname: "",
  phoneNumber: "",
  email: "",
  cv: null,
  relocation: false,
  git: "",
  linkedin: "",
  agreement: false,
  programmingDesc: "",
}
export default function Form() {
  const [formData, setFormData] = useState(initialFields)
  const [programmingLanguage, setProgrammingLanguage] = useState("")
  const [technology, setTechnology] = useState("")
  // const [programingLanguages, setLanguages] = useState([])
  const selectProgramingLanguage = (event) => {
    setFormData({
      ...formData,
      programingLanguages: [
        ...formData.programingLanguages,
        { name: event.target.value, frameworks: [] },
      ],
    })
  }
  const toggleLanguageFramework = (language, framework) => {
    const lang = formData.programingLanguages.find((el) => el.name === language)
    if (lang.frameworks.includes(framework)) {
      lang.frameworks = lang.frameworks.filter((el) => el !== framework)
    } else {
      lang.frameworks = [...lang.frameworks, framework]
    }
    const programingLanguages = formData.programingLanguages.map((el) =>
      el.name === language ? lang : el
    )
    setFormData({ ...formData, programingLanguages })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    fetch("/form/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setFormData(initialFields)
      })
  }
  const onLanguageInput = (val, index) => {
    const data = copy(formData)
    data.languages[index].language = val
    setFormData(data)
  }
  const onFieldChange = (val, field) => {
    const data = copy(formData)
    data[field] = val
    setFormData(data)
  }

  const onLanguageSkillChange = (e, index) => {
    const data = copy(formData)
    data.languages[index].skill = e
    setFormData(data)
  }
  const addLanguage = () => {
    const data = copy(formData)
    data.languages = [...data.languages, { language: "", skill: "" }]
    setFormData(data)
  }
  const onRemoveLanguage = (index) => {
    const data = copy(formData)
    data.languages = data.languages.filter((_, i) => i !== index)
    setFormData(data)
  }
  const addProgrammingLanguage = () => {
    if (Object.keys(frameworks).some((el) => el === programmingLanguage)) {
      return
    }
    setProgrammingLanguage("")
    const data = copy(formData)
    data.programingLanguages = [
      ...data.programingLanguages,
      { name: programmingLanguage, frameworks: [] },
    ]
    frameworks[programmingLanguage] = []
    setFormData(data)
  }
  const addTechnology = (language) => {
    const data = copy(formData)
    data.programingLanguages = data.programingLanguages.map((el) => {
      if (el.name !== language) {
        return el
      }
      let arr
      if (el.frameworks.includes(technology)) {
        arr = el.frameworks
      } else {
        arr = [...el.frameworks, technology]
      }

      return { ...el, frameworks: arr }
    })
    frameworks[language] = [...frameworks[language], technology]
    setTechnology("")
    setFormData(data)
  }
  const removeProgrammingLanguage = (lang) => {
    const data = copy(formData)
    data.programingLanguages = data.programingLanguages.filter(
      (el) => el.name !== lang.name
    )
    setFormData(data)
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <Paper className="form">
          <h1>Programming experience form</h1>
          <Grid container>
            <fieldset className="fieldset">
              <legend>Personal data</legend>
              <Grid container spacing={2}>
                <Grid xs={6} item>
                  <TextField
                    label="Name"
                    placeholder="Your name"
                    variant="outlined"
                    required
                    value={formData.name}
                    onChange={(e) => onFieldChange(e.target.value, "name")}
                  />
                </Grid>
                <Grid xs={6} item>
                  <TextField
                    label="Lastname"
                    placeholder="Your lastname"
                    variant="outlined"
                    required
                    value={formData.surname}
                    onChange={(e) => onFieldChange(e.target.value, "surname")}
                  />
                </Grid>
                <Grid xs={12} item>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={(e) =>
                          onFieldChange(e.target.checked, "relocation")
                        }
                        checked={formData.relocation}
                        name="checkedB"
                      />
                    }
                    label="Relocation to Poland /EU"
                  />
                </Grid>
                <Grid item xs={12} className="languages">
                  <Typography variant="subtitle1" gutterBottom>
                    Languages
                  </Typography>
                  {formData.languages.map((lang, i) => (
                    <Grid spacing={3} container key={i}>
                      <Grid item xs={5}>
                        <TextField
                          label="Language"
                          variant="outlined"
                          value={lang.val}
                          onChange={(e) => onLanguageInput(e.target.value, i)}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Select
                          variant="outlined"
                          value={lang.skill}
                          fullWidth
                          onChange={(e) =>
                            onLanguageSkillChange(e.target.value, i)
                          }
                        >
                          {skillLanguage.map((el) => (
                            <MenuItem key={el} value={el}>
                              {el}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => onRemoveLanguage(i)}>
                          <DeleteIcon color="action" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    className="language__btn"
                    variant="contained"
                    color="secondary"
                    onClick={addLanguage}
                  >
                    ADD
                  </Button>
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Link to github, gitlab, bitbucket..."
                    placeholder=""
                    variant="outlined"
                    fullWidth
                    onChange={(e) => onFieldChange(e.target.value, "git")}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Link to linkedin"
                    placeholder=""
                    variant="outlined"
                    fullWidth
                    onChange={(e) => onFieldChange(e.target.value, "linkedin")}
                  />
                </Grid>
              </Grid>
            </fieldset>
            <fieldset className="fieldset">
              <legend>Technical experience</legend>
              <div className="programming__desc">
                <Typography variant="subtitle1" gutterBottom>
                  Describe your programming experience and your responsibilities
                  and if you can you can provide link to demo or code
                </Typography>
                <TextField
                  label="Description"
                  placeholder=""
                  variant="outlined"
                  className="add__language"
                  fullWidth
                  value={formData.programmingDesc}
                  multiline
                  onChange={(e) => {
                    onFieldChange(e.target.value, "programmingDesc")
                  }}
                />
              </div>
              <Typography variant="subtitle1" gutterBottom>
                Select your programing languages with frameworks
              </Typography>
              <Grid xs={6} item>
                <Select
                  variant="outlined"
                  value=""
                  fullWidth
                  onChange={selectProgramingLanguage}
                >
                  {Object.keys(frameworks)
                    .filter(
                      (framework) =>
                        !formData.programingLanguages.find(
                          (el) => el.name === framework
                        )
                    )
                    .map((framework) => (
                      <MenuItem key={framework} value={framework}>
                        {framework}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <div className="box">
                <Grid item xs={12}>
                  <Typography variant="caption">
                    Didn&apos;t found your programming language <br /> Use input
                    below
                  </Typography>
                  <Grid container className="add">
                    <TextField
                      label="Name of programming language"
                      placeholder=""
                      variant="outlined"
                      className="add__language"
                      size="small"
                      value={programmingLanguage}
                      onChange={(e) => {
                        setProgrammingLanguage(e.target.value)
                      }}
                    />
                    <Button
                      className="add__btn"
                      variant="contained"
                      color="secondary"
                      onClick={addProgrammingLanguage}
                    >
                      ADD
                    </Button>
                  </Grid>
                </Grid>
              </div>
              {formData.programingLanguages.map((language) => (
                <div className="name" key={language.name}>
                  <Grid container justify="space-between">
                    <Typography
                      className="name__title"
                      variant="h6"
                      gutterBottom
                    >
                      {language.name}
                    </Typography>
                    <IconButton
                      onClick={() => removeProgrammingLanguage(language)}
                    >
                      <DeleteIcon color="action" />
                    </IconButton>
                  </Grid>
                  <div className="technologies">
                    <Typography
                      variant="subtitle2"
                      className="technologies__title"
                    >
                      technologies
                    </Typography>
                    {frameworks[language.name].map((el) => {
                      return (
                        <Chip
                          className="form__chip"
                          key={el}
                          label={el}
                          onClick={() =>
                            toggleLanguageFramework(language.name, el)
                          }
                          variant={
                            language.frameworks.includes(el)
                              ? "default"
                              : "outlined"
                          }
                          color="primary"
                          onDelete={
                            language.frameworks.includes(el)
                              ? () => toggleLanguageFramework(language.name, el)
                              : null
                          }
                        />
                      )
                    })}
                    <div>
                      <Grid item xs={12}>
                        <Typography variant="caption">
                          Didn&apos;t found your technology <br /> Use input
                          below
                        </Typography>
                        <Grid container className="add">
                          <TextField
                            label="Name of technology"
                            placeholder=""
                            variant="outlined"
                            className="add__language"
                            size="small"
                            value={technology}
                            onChange={(e) => setTechnology(e.target.value)}
                          />
                          <Button
                            className="add__btn"
                            variant="contained"
                            color="secondary"
                            onClick={() => addTechnology(language.name)}
                          >
                            ADD
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              ))}
            </fieldset>
            <fieldset className="fieldset">
              <legend>Contact data</legend>
              <Grid item xs={12}>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      required
                      value={formData.email}
                      onChange={(e) => onFieldChange(e.target.value, "email")}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <TextField
                      label="Phone number"
                      variant="outlined"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        onFieldChange(e.target.value, "phoneNumber")
                      }
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      required
                      checked={formData.agreement}
                      onChange={(e) =>
                        onFieldChange(e.target.checked, "agreement")
                      }
                    />
                  }
                  label="I declare that I use the above e-mail address / phone nubmer and agree to treat this address as a correspondence address for future recruitment process"
                />
              </Grid>
            </fieldset>
          </Grid>
          <Grid justify="center" container>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Paper>
      </form>
    </Container>
  )
}
