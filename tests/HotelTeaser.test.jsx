import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HotelTeaser from '../src/HotelTeaser';

describe('HotelTeaser', () => {
  const mockProps = {
    name: 'Test Hotel',
    price: '100',
    description: 'Test description',
    imageURL: 'https://example.com/image.jpg',
    url: '/hotel/123'
  };

  it('renders hotel name', () => {
    render(<HotelTeaser {...mockProps} />);
    expect(screen.getByText('Test Hotel')).toBeInTheDocument();
  });

  it('renders hotel price', () => {
    render(<HotelTeaser {...mockProps} />);
    expect(screen.getByText('EUR 100')).toBeInTheDocument();
  });

  it('renders hotel description', () => {
    render(<HotelTeaser {...mockProps} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders hotel image with correct alt text', () => {
    render(<HotelTeaser {...mockProps} />);
    const image = screen.getByAltText('Test Hotel');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders link with correct href', () => {
    render(<HotelTeaser {...mockProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/hotel/123');
  });

  it('renders availability status', () => {
    render(<HotelTeaser {...mockProps} />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });
}); 