# Frictionless Signup
<p style="text-align:center"><img src="http://g.recordit.co/bvOrncPN5n.gif"></p>

## Overview
Frictionless Signup is Segment’s open-source project to enable the auto-population of form fields with enriched data from Clearbit and Madkudu.

To get started, create a form on your website that accepts and email address.  Then add the JavaScript in this repo.  In a nutshell, you will hit Clearbit's API with the email address, then use the response payload to prefill the remaining form fields.  You can also append the firmographic info (i.e. info related to the person and firm) to your Segment `analytics.identify()` call so that you have a much richer profile of your customer.

## Purpose
The purpose of Frictionless Signup is to reduce the amount of effort in submitting online forms, without sacrificing rich data about potential customers that marketers, analysts, and product managers might want to use for personalization, sales efficiency, and analysis purposes.

## How it works
You can see the form in action [here](#).

## Prerequisites
You will need a [Segment account](https://segment.com/signup), a [Clearbit account](https://dashboard.clearbit.com/signup), and a [Madkudu account](https://app.madkudu.com/signup?plan=frictionless) for this.

We also advise reading this How-To Guide as a more complete walkthrough of this project at Segment.

## How it works
**Step 1:** Accept an Email Address

**Step 2:** Listen for changes to email form field JavaScript to Listen for Email Field Changes

**Step 3:** HTTP request to the server with the email address

**Step 4:** Query the Clearbit API with the email address

**Step 5:** Prefill remaining form fields with response payload from Clearbit

## How to run locally
1. In a terminal, go to 'backend' directory and run `npm install` there.
2. Go back to the root of the project and run `SEGMENT_API_KEY=xxx CLEARBIT_API_KEY=xxx MADKUDU_API_KEY=yyy node index.js`. Keep this terminal open: you're now running a proxy server running on local using port 3000. It will relay the calls from your webpage to Clearbit and MadKudu's API services.
3. Open another terminal, go to the 'front' directory, and do a `npm install`.
4. Run `grunt` to assemble a `bundle.min.js` and a `bundle.js` files which will be used in the demo html page.
5. Still in the front folder open `index.html` in your file browser to open the webpage.
6. Type an email address in the first field (for instance alex@uber.com).
7. You will see the form automatically filled up! 

# API Backend

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


## Example of Clearbit API response for email enrichment
Using the Node library by clearbit and calling `clearbit.Enrichment.find({ email: ‘alex@example.com’ })`, you can expect a response from their server that looks similar to:
```js
    {
      "person": {
        "id": "a0dd5de3-b1ff-449d-85ab-4b2ffdfdca53",
        "name": {
          "fullName": "Alex Pruce",
          "givenName": "Alex",
          "familyName": "Pruce"
        },
        "email": "alex@example.com",
        "location": "San Francisco, CA, US",
        "employment": {
          "domain": "example.com",
          "name": "Example",
          "title": "Digital Brand and Content Lead",
          "role": "marketing",
          "seniority": "manager"
        },
      },
      "company": {
        "id": "3f5d6a4e-c284-4f78-bfdf-7669b45af907",
        "name": "Example",
        "legalName": "Example Technologies Inc.",
        "domain": "example.com",
        "domainAliases": [
          "example.org"
        ],
        "url": "https://www.example.com",
        "metrics": {
          "alexaUsRank": 358,
          "alexaGlobalRank": 730,
          "googleRank": null,
          "employees": 20313,
          "marketCap": null,
          "raised": 106000000,
          "annualRevenue": 1500000000
        },
      },
    }
```


## Contributor list
Thank you  [Guillaume Cabane](https://github.com/guillaumecabane),[Yanael Barbier](https://github.com/st3w4r), [Gilles Bertaux](https://github.com/gillesbertaux), [Ben Hoffman](https://github.com/benjaminhoffman)

## Credits, Inspiration, Alternatives
This project was originally inspired by a similar project of Guillaume Cabane while he was CMO of Mention in Paris. The project was led by Gilles Bertaux and developed by Yanael Barbier. At Segment, in his capacity of VP Growth, Guillaume used Frictionless Signup to increase signup conversions and high-quality leads.  
