
<div align="center">

# Kelly Criterion Betting Calculator

[![License](https://img.shields.io/badge/License-Placeholder-blue.svg)](./LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](CONTRIBUTING.md)
</div>

## Project Description

This repository contains the code for a Kelly Criterion Betting Calculator browser extension. The extension helps users calculate the optimal bet size based on the Kelly Criterion method, taking into account factors like account size, decimal odds, and the user's confidence in the bookmaker's odds. The extension provides various bet size recommendations, including the Kelly bet amount and fractional Kelly bets (10%, 25%, 50%, and 75%).

## Features

-   Calculates the optimal bet size using the Kelly Criterion.
-   Allows users to input account size, decimal odds, and a weight reflecting their trust in the bookmaker's odds.
-   Displays the implied probability of the bet.
-   Provides recommendations for Kelly bet amount and fractional Kelly bets.
-   Saves and loads account size using browser storage.
-   Copy calculated values to the clipboard.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Dependencies](#dependencies)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

## Installation

1.  Download the repository as a ZIP file.
2.  Extract the ZIP file to a local directory.
3.  Open your Chrome browser and navigate to `chrome://extensions`.
4.  Enable "Developer mode" in the top right corner.
5.  Click "Load unpacked" and select the directory where you extracted the ZIP file.

## Usage

1.  Open the Kelly Criterion Betting Calculator extension by clicking its icon in the Chrome toolbar.
2.  Enter your account size in the "Account Size" field.
3.  Enter the decimal odds for the bet in the "Decimal Odds" field.
4.  Adjust the "Weight for Bookmaker Odds" field to reflect your trust in the bookmaker's odds (a higher value indicates more trust).
5.  Click the "Calculate" button to calculate the Kelly bet amount and fractional Kelly bets.
6.  Click on the displayed results to copy them to your clipboard.

## Dependencies

-   HTML
-   CSS
-   JavaScript
