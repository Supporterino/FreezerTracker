import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Alert, Button, Stack, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <Stack p="md" align="center">
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Something went wrong"
            color="red"
            maw={500}
          >
            <Text size="sm">{this.state.error?.message ?? 'An unexpected error occurred.'}</Text>
          </Alert>
          <Button variant="light" onClick={this.handleReset}>
            Try again
          </Button>
        </Stack>
      );
    }
    return this.props.children;
  }
}
