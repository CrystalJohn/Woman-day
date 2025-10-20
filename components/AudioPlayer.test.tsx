import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AudioPlayer from './AudioPlayer';

describe('AudioPlayer', () => {
  test('renders AudioPlayer component with initial state', () => {
    render(<AudioPlayer />);
    expect(screen.getByText('🎵 Click to Play')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('toggles play state when button is clicked', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer />);

    const button = screen.getByRole('button');

    // Initially should show "Click to Play"
    expect(screen.getByText('🎵 Click to Play')).toBeInTheDocument();

    // Click to play
    await user.click(button);
    expect(screen.getByText('🎵 Now Playing')).toBeInTheDocument();

    // Click to pause
    await user.click(button);
    expect(screen.getByText('🎵 Click to Play')).toBeInTheDocument();
  });
});