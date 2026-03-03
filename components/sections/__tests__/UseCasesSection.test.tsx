import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UseCasesSection from '../UseCasesSection';

describe('UseCasesSection', () => {
  it('should render the section with default title and subtitle', () => {
    render(<UseCasesSection />);
    
    expect(screen.getByText('Industry Use Cases')).toBeInTheDocument();
    expect(screen.getByText(/Trusted by organizations that demand the highest level of security/i)).toBeInTheDocument();
  });

  it('should render all five industry use cases', () => {
    render(<UseCasesSection />);
    
    expect(screen.getByText('Government')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('Journalists')).toBeInTheDocument();
    expect(screen.getByText('Corporate Executives')).toBeInTheDocument();
    expect(screen.getByText('NGOs')).toBeInTheDocument();
  });

  it('should render use case descriptions', () => {
    render(<UseCasesSection />);
    
    expect(screen.getByText('Secure communications for government agencies')).toBeInTheDocument();
    expect(screen.getByText('Military-grade security for defense contractors')).toBeInTheDocument();
    expect(screen.getByText('Protection for investigative journalists')).toBeInTheDocument();
    expect(screen.getByText('Executive-level privacy and security')).toBeInTheDocument();
    expect(screen.getByText('Secure operations for non-governmental organizations')).toBeInTheDocument();
  });

  it('should render industry-specific benefits for each use case', () => {
    render(<UseCasesSection />);
    
    // Government benefits
    expect(screen.getByText('FIPS 140-2 compliant encryption')).toBeInTheDocument();
    expect(screen.getByText('Secure inter-agency communication')).toBeInTheDocument();
    
    // Defense benefits
    expect(screen.getByText('ITAR and EAR compliance')).toBeInTheDocument();
    expect(screen.getByText('Secure tactical communications')).toBeInTheDocument();
    
    // Journalists benefits
    expect(screen.getByText('Source anonymity protection')).toBeInTheDocument();
    expect(screen.getByText('Encrypted communications')).toBeInTheDocument();
    
    // Corporate benefits
    expect(screen.getByText('C-suite communication security')).toBeInTheDocument();
    expect(screen.getByText('Intellectual property protection')).toBeInTheDocument();
    
    // NGOs benefits
    expect(screen.getByText('Field worker safety')).toBeInTheDocument();
    expect(screen.getByText('Donor information protection')).toBeInTheDocument();
  });

  it('should render CTA button with correct link', () => {
    render(<UseCasesSection />);
    
    const ctaButton = screen.getByText('Discuss Your Use Case');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '#lead-capture');
  });

  it('should render with custom title and subtitle', () => {
    const customTitle = 'Custom Use Cases';
    const customSubtitle = 'Custom subtitle text';
    
    render(<UseCasesSection title={customTitle} subtitle={customSubtitle} />);
    
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
  });

  it('should render custom use cases when provided', () => {
    const customUseCases = [
      {
        id: 'custom1',
        industry: 'Custom Industry',
        icon: <div>Icon</div>,
        description: 'Custom description',
        benefits: ['Benefit 1', 'Benefit 2']
      }
    ];
    
    render(<UseCasesSection useCases={customUseCases} />);
    
    expect(screen.getByText('Custom Industry')).toBeInTheDocument();
    expect(screen.getByText('Custom description')).toBeInTheDocument();
    expect(screen.getByText('Benefit 1')).toBeInTheDocument();
    expect(screen.getByText('Benefit 2')).toBeInTheDocument();
  });

  it('should render icons for each use case', () => {
    const { container } = render(<UseCasesSection />);
    
    // Check that icon containers are rendered (5 use cases)
    const iconContainers = container.querySelectorAll('.p-4.bg-cyber-green\\/10');
    expect(iconContainers).toHaveLength(5);
  });

  it('should apply responsive grid classes', () => {
    const { container } = render(<UseCasesSection />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });
});
