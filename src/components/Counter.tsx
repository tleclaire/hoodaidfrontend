import * as React from 'react';
import { Component } from 'react';

interface ICountState {
  currentCount: number;
}

export class Counter extends Component<{}, ICountState> {
  static displayName = Counter.name;

  constructor(props: any) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  public incrementCounter(): void {
    this.setState({
      currentCount: this.state.currentCount + 1,
    });
  }

  public render(): React.ReactElement {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">
          Current count: <strong>{this.state.currentCount}</strong>
        </p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>
          Increment
        </button>
      </div>
    );
  }
}
