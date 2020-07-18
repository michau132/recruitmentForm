import React, { useState } from 'react';
import {Container, TextField, Paper, Grid, FormControl, Switch, FormControlLabel, Checkbox, Select, MenuItem, Typography, Chip, Button} from '@material-ui/core'

import './App.css';
const frameworks = {
  javascript: ['NodeJS', 'React', 'Angular', 'Vue', 'express', 'NestJS'],
  java: ['JSP', 'Spring', 'SpringBoot'],
  php: ['Symfony', 'Zend'],
  'c#': ['.Net']
}
function App() {
  const [languages, setLanguages] = useState([])
  const selectLanguage = (event) => {
    setLanguages([...languages, {name: event.target.value, frameworks: []}]);
  };
  const handleClick = (language, framework) => {
    const lang = languages.find(el => el.name === language)
    if(lang.frameworks.includes(framework)) {
      lang.frameworks = lang.frameworks.filter(el => el !== framework)
    } else {
      lang.frameworks = [...lang.frameworks, framework]
    }
    const langs = languages.map(el => el.name === language ? lang: el)
    setLanguages(langs)
  };
  const onSubmit = (e) => {
    e.preventDefault()
    alert('No elo')
  }
  return (
    <div className="App">
<Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <Paper className="form">
          <h1>Programming experience form</h1>
          <Grid container>
              <fieldset className="fieldset">
              <legend>Personal data</legend>
            <Grid container spacing={2}>
              <Grid xs={6} item>
              <TextField label="Name" placeholder="Your name" variant="outlined" required />
              </Grid>
              <Grid xs={6} item>

              <TextField label="Lastname" placeholder="Your lastname" variant="outlined" required />
              </Grid>
              <Grid xs={12} item>
              <FormControlLabel control={<Switch />} label="Relocation" />
              </Grid>
              <Grid xs={12} item>
              <TextField label="Link to github, gitlab, bitbucket..." placeholder="" variant="outlined" fullWidth  />
              </Grid>
              <Grid xs={12} item>
              <TextField label="Link to linkedin" placeholder="" variant="outlined" fullWidth  />
              </Grid>
            </Grid>
              </fieldset>
              <fieldset className="fieldset">
                <legend>Technical experience</legend>
                <Typography variant="subtitle1" gutterBottom>Select your languages with frameworks</Typography>
                <Grid xs={6} item>
                  
                <Select variant="outlined" value="" fullWidth onChange={selectLanguage}>
                  {Object.keys(frameworks).filter(framework => !languages.find(el => el.name === framework)).map(framework => (
                    <MenuItem key={framework} value={framework}>{framework}</MenuItem>  
                  ))}
                </Select>
                </Grid>
                {
                  languages.map(language => (
                    <div className="name" key={language.name}>
                      <Typography variant="subtitle1" gutterBottom>{language.name}</Typography>
                      {
                        frameworks[language.name].map(el => {
                          return <Chip
                          key={el}
                            label={el}
                            onClick={() => handleClick(language.name, el)}
                            color={language.frameworks.includes(el) ? "primary" : 'secondary'}
                          />
                        })
                      }
                    </div>
                  ))
                }
              </fieldset>
              <fieldset className="fieldset">
                <legend>Contact data</legend>
                <Grid item xs={12}>
                  <Grid item container spacing={2}>
                    <Grid item xs={6}>
                      <TextField type="email" label="Email" variant="outlined"  required />
                    </Grid>
                    <Grid xs={6} item>
                      <TextField label="Phone number" variant="outlined"  required />
                    </Grid>
                  </Grid>
                <FormControlLabel required control={<Checkbox required/>} label="I declare that I use the above e-mail address / phone nubmer and agree to treat this address as a correspondence address for future recruitment process" />
              </Grid>
              </fieldset>
              
          </Grid>
          <Grid justify="center" container><Button variant="contained" color="primary" type="submit">Submit</Button></Grid>
        </Paper>

      </form>
  
  </Container>      
    </div>
  );
}

export default App;
