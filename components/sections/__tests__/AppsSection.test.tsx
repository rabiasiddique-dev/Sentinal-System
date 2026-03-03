import { render, screen, fireEvent } from '@testing-library/react';
import AppsSection from '../AppsSection';

describe('AppsSection', () => {
  it('should render the section with default title', () => {
    render(<AppsSection />);
    expect(screen.getByText('Secure Apps Included')).toBeInTheDocument();
  });

  it('should render five app cards', () => {
    render(<AppsSection />);
    expect(screen.getByText('Sentinel Browser')).toBeInTheDocument();
    expect(screen.getByText('OpenMail')).toBeInTheDocument();
    expect(screen.getByText('ProtonMaps')).toBeInTheDocument();
    expect(screen.getByText('OpenApp Market')).toBeInTheDocument();
    expect(screen.getByText('SignalX')).toBeInTheDocument();
  });

  it('should display app descriptions', () => {
    render(<AppsSection />);
    expect(screen.getByText(/Privacy-focused web browser/i)).toBeInTheDocument();
    expect(screen.getByText(/Secure email client/i)).toBeInTheDocument();
  });

  it('should open modal when app card is clicked', () => {
    render(<AppsSection />);
    
    const sentinelBrowserCard = screen.getByText('Sentinel Browser').closest('div');
    if (sentinelBrowserCard) {
      fireEvent.click(sentinelBrowserCard);
    }
    
    // Modal should show detailed features
    expect(screen.getByText('Key Features')).toBeInTheDocument();
  });

  it('should display all features in modal', () => {
    render(<AppsSection />);
    
    // Click on Sentinel Browser
    const sentinelBrowserCard = screen.getByText('Sentinel Browser').closest('div');
    if (sentinelBrowserCard) {
      fireEvent.click(sentinelBrowserCard);
    }
    
    // Check for features
    expect(screen.getByText(/Built-in ad and tracker blocking/i)).toBeInTheDocument();
    expect(screen.getByText(/Encrypted DNS over HTTPS/i)).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', () => {
    render(<AppsSection />);
    
    // Open modal
    const sentinelBrowserCard = screen.getByText('Sentinel Browser').closest('div');
    if (sentinelBrowserCard) {
      fireEvent.click(sentinelBrowserCard);
    }
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Modal content should not be visible
    expect(screen.queryByText('Key Features')).not.toBeInTheDocument();
  });

  it('should render custom title and subtitle', () => {
    render(
      <AppsSection 
        title="Custom Apps Title" 
        subtitle="Custom subtitle text"
      />
    );
    
    expect(screen.getByText('Custom Apps Title')).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle text')).toBeInTheDocument();
  });

  it('should render Learn More button on each card', () => {
    render(<AppsSection />);
    const learnMoreButtons = screen.getAllByText('Learn More');
    expect(learnMoreButtons).toHaveLength(5);
  });
});
