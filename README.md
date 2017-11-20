# Find Events happening in your vicinity
Events can be searched by updating the fields in the top.

**Steps** <br />
1. Set environment variable for API hostname i.e `HOST_URL`. for e.g `export HOST_URL="http://127.0.0.1:3000"`
2. From root of the project run `npm install`
3. For Email to work. Set environment variable for Sendgrid API key i.e `SENDGRID_API_KEY`
4. To start the project run `node .`
5. For sending out the reminder email. Use the cron file `/server/cron/remind.js`

**Stack Used**
- ExpressJs
- MongoDb, `mongoose` 
- EJS Template engine
