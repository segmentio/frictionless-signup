# Segment’s Frictionless Signup
## Overview
Frictionless Signup is Segment’s open-source project to enable the auto-population of form fields with enriched data from Clearbit and Madkudu.

To get started, create a form on your website that accepts and email address.  Then add the JavaScript in this repo.  In a nutshell, you will hit Clearbit's API with the email address, then use the response payload to prefill the remaining form fields.  You can also append the firmographic info (i.e. info related to the person and firm) to your Segment `analytics.identify()` call so that you have a much richer profile of your customer.

## Purpose
The purpose of Frictionless Signup is to reduce the amount of effort in submitting online forms, without sacrificing rich data about potential customers that marketers, analysts, and product managers might want to use for personalization, sales efficiency, and analysis purposes.

## How it works
You can see the form in action [here](#).

## Prerequisites
You will need a Segment account, a Clearbit account, and a Madkudu account for this.

We also advise reading this How-To Guide as a more complete walkthrough of this project at Segment.


## Installation instructions
**Step 1:** Accept an Email Address

**Step 2:** Listen for changes to email form field JavaScript to Listen for Email Field Changes 

**Step 3:** HTTP request to the server with the email address

**Step 4:** Query the Clearbit API with the email address

**Step 5:** Prefill remaining form fields with response payload from Clearbit


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
Thank you  [Guillaume Cabane](https://github.com/guillaumecabane), [Gilles Bertaux](https://github.com/gillesbertaux), [Ben Hoffman](https://github.com/benjaminhoffman)

## Credits, Inspiration, Alternatives
This project was originally inspired by a similar project of Guillaume Cabane while he was CMO of Mention in Paris. At Segment, in his capacity as Head of Growth, Guillaume used Frictionless Signup to increase signup conversions and high-quality leads. 
