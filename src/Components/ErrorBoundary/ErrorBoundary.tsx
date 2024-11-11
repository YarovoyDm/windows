import React, { ReactNode } from "react";
import styles from "./ErrorBoundary.module.scss";
import { connect } from "react-redux";
import { updateSystemScenario } from "Store/slices/System";
import { Dispatch } from "redux";

interface ProgressBarState {
    progress: number;
    stepIndex: number;
    hasError: boolean;
}

interface ErrorBoundaryProps {
    children: ReactNode;
    dispatchScenarioAction: () => void;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ProgressBarState
> {
    private intervalId: NodeJS.Timeout | null = null;
    readonly progressSteps = [0, 15, 45, 90, 100];

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { progress: 0, stepIndex: 0, hasError: false };
    }

    static getDerivedStateFromError(_: Error): Partial<ProgressBarState> {
        return { hasError: true };
    }

    componentDidMount() {
        if (this.state.hasError) {
            this.startProgress();
        }
    }

    componentDidUpdate(
        prevProps: ErrorBoundaryProps,
        prevState: ProgressBarState,
    ) {
        if (this.state.hasError && !prevState.hasError) {
            this.startProgress();
        }
    }

    componentWillUnmount() {
        if (this.intervalId) clearInterval(this.intervalId);
    }

    getRandomInterval = () => {
        return Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    };

    onComplete = () => {
        this.props.dispatchScenarioAction();
    };

    startProgress = () => {
        const updateProgress = () => {
            const { stepIndex } = this.state;

            if (stepIndex < this.progressSteps.length - 1) {
                this.setState(
                    {
                        stepIndex: stepIndex + 1,
                        progress: this.progressSteps[stepIndex + 1],
                    },
                    () => {
                        this.intervalId = setTimeout(
                            updateProgress,
                            this.getRandomInterval(),
                        );
                    },
                );
            } else {
                if (this.intervalId) clearTimeout(this.intervalId);
                this.onComplete();
                this.setState({ hasError: false, progress: 0, stepIndex: 0 });
            }
        };

        this.intervalId = setTimeout(updateProgress, this.getRandomInterval());
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.wrapper}>
                    <div className={styles.sadSmile}>:(</div>
                    <div className={styles.errorMessage}>
                        Your device ran into a problem and needs to restart.
                        We're just collecting some error info, and then we'll
                        restart for you.
                    </div>
                    <div className={styles.progress}>
                        {this.state.progress}% complete
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchScenarioAction: () => dispatch(updateSystemScenario("restart")),
});

export default connect(null, mapDispatchToProps)(ErrorBoundary);
