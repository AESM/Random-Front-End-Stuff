// stopwatch.js

class Stopwatch {

  constructor(display) {
    this.timerRunning = false;
    this.timerDisplay = display;
    this.reset();
    this.print(this.times);
  }

  start() {
    /// If the state of time isn't identified, set it using performance.now()
    if (!this.time) {
      this.time = performance.now();
    }

    /// If the timer's state isn't set to running...
    if (!this.timerRunning) {
      /// Run the timer
      this.timerRunning = true;
      /// Bind step() to requestAnimationFrame, to animate the browser
      requestAnimationFrame(this.step.bind(this));
    }
  }

  pause() {
    /// Set the timer's state to not running
    this.timerRunning = false;
    /// Set the state of time to null
    this.time = null;
  }

  reset() {
    /// Initial state of displayed timer is all zeros
    this.times = [0, 0, 0];
  }

  restart() {
    this.start();
    this.reset();
  }

  calculate(timestamp) {
    /// Difference between the timestamp and the current state of time
    let difference = timestamp - this.time;

    /// A hundredth of a second is 100 milliseconds
    this.times[2] += difference / 10;

    /// A second is 100 hundredths of a second
    if (this.times[2] >= 100) {
      this.times[1] += 1;
      this.times[2] -= 100;
    }

    /// A minute is 60 seconds
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }
  }

  formatting(times) {
    /// The format of the timer is 00:00:00
    return `${formatHelper(times[0], 2)}:${formatHelper(times[1], 2)}:${formatHelper(Math.floor(times[2]), 2)}`;
  }

  print() {
    /// Render the displayed timer using the returned value of formatting()
    this.timerDisplay.innerText = this.formatting(this.times);
  }

  step(timestamp) {
    /// If the timer's state isn't set to running, exit the function
    if (!this.timerRunning) {
      return;
    }

    /// Calculate the time using the timestamp passed in
    this.calculate(timestamp);
    /// Update the current state of time using the timestamp passed in
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }
}

function formatHelper(input, count) {
  let result = input.toString();

  for (result; result.length < count; --count) {
    result = '0' + result;
  }

  return result;
}

let stopwatch = new Stopwatch(document.querySelector('.stopwatch-display'));
