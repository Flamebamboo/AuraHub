export class SessionTracker {
  constructor() {
    this.reset();
  }

  reset() {
    this.startTime = null;
    this.endTime = null;
    this.pauseIntervals = [];
    this.currentPauseStart = null;
  }

  start() {
    if (this.currentPauseStart) {
      //occurs when we pause and then start again
      this.pauseIntervals.push({
        start: this.currentPauseStart,
        end: new Date(),
      });
      this.currentPauseStart = null;
    } else {
      //first start
      this.startTime = new Date();
    }
  }

  pause() {
    if (!this.currentPauseStart) {
      this.currentPauseStart = new Date();
    }
  }

  stop() {
    this.endTime = new Date();
    //make it so that it aslo push the pause intervals if stop during pause
    if (this.currentPauseStart) {
      this.pauseIntervals.push({
        start: this.currentPauseStart,
        end: new Date(),
      });
      this.currentPauseStart = null;
    }
  }

  getStats() {
    if (!this.startTime || !this.endTime) return null;

    const totalPauseDuration = this.pauseIntervals.reduce(
      (total, interval) => total + (interval.end - interval.start),
      0
    );

    return {
      startTime: this.startTime,
      endTime: this.endTime,
      totalDuration: Math.round((this.endTime - this.startTime - totalPauseDuration) / 1000),
    };
  }
}
