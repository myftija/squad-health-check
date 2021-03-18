# Squad Health Check

Squad Health Check is a simple tool to conduct surveys on the mood of development teams. It helps
measure and visualize how the team is doing. It is inspired by a [post](https://engineering.atspotify.com/2014/09/16/squad-health-check-model/) in the [Spotify engineering blog](https://engineering.atspotify.com/).
As the blog post's author suggests, the primary audience is meant to be the team rather than management.
Read the blog post to learn more about the health check model and get more insights on the elements of the survey.

See a demo at [shc.myftija.com](https://shc.myftija.com/). The survey responses are persisted on a Google spreadsheet, so you can easily make charts out of them to visualize the _sentiments_ and _trends_. Check out an example at this [link](https://docs.google.com/spreadsheets/d/1M9t6lABTOY_TPStrJ21326a2tqEFxLaDff_tC-pZzgA/edit#gid=1904152999).

## Setup

Squad Health Check is a React app. [Sheety](https://sheety.co/) is being used for the API; it provides a layer
on top of the Google Sheets API which makes it easy and quick to create HTTP endpoints for manipulating data in spreadsheets.

### Deploying

It is quite straightforward to deploy the app and start using it in your team. This section goes over the steps.

1. Login into your Google account and import this [spreadsheet](https://docs.google.com/spreadsheets/d/1M9t6lABTOY_TPStrJ21326a2tqEFxLaDff_tC-pZzgA/edit#gid=361520908): `File` > `Make a copy`

2. Go to [Sheety](https://sheety.co/) and open an account.

3. Create a new Sheety project: `New Project` > `From Google Sheet...` > paste the URL of the spreadsheet you previously imported

4. Enable the `GET` method for the `surveys` sheet and the `POST` method for the `responses` sheet. Disable all other methods across all sheets.

5. Copy the Sheety API URL and export it as an environment variable under the name `REACT_APP_API_URL`. You can also do this by creating a `.env.production.local` file in the root directly and defining the variable there:

   ```shell
   touch .env.production.local
   echo "REACT_APP_API_URL=https://api.sheety.co/YOUR_SHEETY_USER_ID/SHEETY_PROJECT_NAME" > .env.production.local
   ```

   Refer to [.env.production.local.template](./.env.production.local.template). Note that your Sheety API URL should not contain a sheet name.

6. Deploy the React app by a method of your choosing. There are abundant options which make it terribly easy to deploy. For example, deploying to [Netlify](https://www.netlify.com/) is as easy as executing the following commands:

   ```shell
   npm install netlify-cli -g
   yarn build
   netlify deploy --dir ./build
   ```

   Find out more about deploying React apps in the [docs](https://create-react-app.dev/docs/deployment).

That's it! You can start using the app now.

## Usage

Once you got the app all setup, start by removing the dummy data in your imported spreadsheet.
Clear the rows in the `responses` sheet. Next, clear the content of the `date` column in the `surveys` sheet; leave the `response_count` column intact as it contains a formula to count the responses.

To create a new survey, simply add a new date in the `surveys` sheet. Double click a cell in the `date` column to show a tooltip that prompts you to select a date. Do not modify the cells in the `response_count` column.

That's it! You can now share the link with your team and responses will be persisted in the spreadsheet.

The `charts` sheet will automatically be populated with data, so there is not need to modify anything besides selecting the date at the top row of the sheet. But you could of course add additional visualizations of your liking.

## Contributing

Contributions are welcome! Feel free to open a pull request or issue.

## License

[MIT](./LICENSE)
