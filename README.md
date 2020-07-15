```
  materialize-admin/        <-- Template root folder
  |--css/
  |  |--custom/custom.css   <-- Write your custom css or generate custom.css using custom.scss
  |  |--materialize.css     <-- compiled from scss/materialize.scss
  |  |--style.css           <-- compiled from scss/style.scss
  |
  |--fonts/                 <-- Template fonts & icon-fonts
  |  |--roboto/
  |  |--material-design-icons/
  |
  |--images/                <-- All the images of the template
  |
  |--js/
  |  |--custom-script.js     <-- The core of the App, it has all logic for the layout
  |  |--variable.js          <-- The JSON of the layout [change it with your layouts]
  |  |--charts.js            <-- All usable Charts [add your new charts here ]
  |  |--plugins.js           <-- Template main JS file
  |  |--materialize-plugins/ <-- Materialize framework core JS files
  |  |--scripts/             <-- Template html page wise js scripts
  |  |--materialize.js       <-- Materialize framework JS file generated from materialize-plugins/
  |  |--plugins.js           <-- Template main JS file
  |
  custom.css file.
  |  |--theme-components/    <-- Template components SCSS file
  |  |--themes/              <-- Template different themes SCSS file, you can create your own theme folder here !
  |  |--materialize.scss     <-- Materialize framework main SCSS files
  |  |--style.scss           <-- Template main SCSS files
  |  |--theme.scss           <-- Auto generated theme.scss file from Grunt, Generate for specific theme(i.e collapsible-menu) based on grunt commend  grunt watch --Layout="collapsible-menu"
  |
  |--vendors/                <-- All Venders JS & SCSS
  |
  *.html                     <-- Template all html file here 
  |
  package.json               <-- Node package JSON file.
  |
  README.md                  <-- Readme file
        
```

