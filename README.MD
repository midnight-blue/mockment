# Mockment

![Test](https://github.com/midnight-blue/mockment/workflows/TestAction/badge.svg)

## Description

Mockment is a small library of functions supposed to facilitate testing code using the `moment` library.  
Specifically `mockment` helps you to test code which uses `moment()` or `moment.now()`.

## Installation

Install `mockment` with

`npm i -D mockment`

## Usage

`mockment` exposes the following functions.

The following function manipulate how `moment` determines the current time, each of them accepting a single parameter that can either be a time in milliseconds sice Unix epoch, an object of type `Date` or an object of type `Moment`

- `setNowBeforeEach`  
  This function sets `moment`'s current time globally to the passed time. By default, the current time is set to `Date.now()` before each test execution.

- `setNowTo`  
  This function immediately sets the current time to the passed time.
  This function can be used to change the current time within the execution of a test.

- `startNowFrom`  
  This function bases the current time of the passed value.
  Moment will resolve the current time as the passed value plus the time elapsed since the base was set.

The current time behavior can be reset to its original behavior using `resetAll`
