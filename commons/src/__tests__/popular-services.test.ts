import { describe, it, expect } from 'vitest';
import { POPULAR_SERVICES, type PopularService } from '../index';

describe('POPULAR_SERVICES', () => {
  it('should contain exactly 12 services', () => {
    expect(POPULAR_SERVICES).toHaveLength(12);
  });

  it('should include Netflix', () => {
    const netflix = POPULAR_SERVICES.find((s) => s.id === 'netflix');
    expect(netflix).toBeDefined();
    expect(netflix?.name).toBe('Netflix');
    expect(netflix?.defaultPrice).toBe(15.99);
    expect(netflix?.defaultCycle).toBe('monthly');
    expect(netflix?.category).toBe('streaming');
    expect(netflix?.cancellationUrl).toBe('https://netflix.com/cancel');
  });

  it('should include Spotify', () => {
    const spotify = POPULAR_SERVICES.find((s) => s.id === 'spotify');
    expect(spotify).toBeDefined();
    expect(spotify?.name).toBe('Spotify');
    expect(spotify?.defaultPrice).toBe(10.99);
    expect(spotify?.category).toBe('music');
  });

  it('should include Amazon Prime', () => {
    const amazonPrime = POPULAR_SERVICES.find((s) => s.id === 'amazon-prime');
    expect(amazonPrime).toBeDefined();
    expect(amazonPrime?.name).toBe('Amazon Prime');
    expect(amazonPrime?.defaultPrice).toBe(14.99);
    expect(amazonPrime?.category).toBe('shopping');
  });

  it('should include Adobe Creative Cloud', () => {
    const adobe = POPULAR_SERVICES.find((s) => s.id === 'adobe-cc');
    expect(adobe).toBeDefined();
    expect(adobe?.name).toBe('Adobe Creative Cloud');
    expect(adobe?.defaultPrice).toBe(54.99);
    expect(adobe?.category).toBe('software');
  });

  it('should include YouTube Premium', () => {
    const youtube = POPULAR_SERVICES.find((s) => s.id === 'youtube-premium');
    expect(youtube).toBeDefined();
    expect(youtube?.name).toBe('YouTube Premium');
    expect(youtube?.category).toBe('streaming');
  });

  it('should include Disney+', () => {
    const disney = POPULAR_SERVICES.find((s) => s.id === 'disney-plus');
    expect(disney).toBeDefined();
    expect(disney?.name).toBe('Disney+');
    expect(disney?.category).toBe('streaming');
  });

  it('should include HBO Max', () => {
    const hbo = POPULAR_SERVICES.find((s) => s.id === 'hbo-max');
    expect(hbo).toBeDefined();
    expect(hbo?.name).toBe('HBO Max');
    expect(hbo?.category).toBe('streaming');
  });

  it('should include iCloud', () => {
    const icloud = POPULAR_SERVICES.find((s) => s.id === 'icloud');
    expect(icloud).toBeDefined();
    expect(icloud?.name).toBe('iCloud');
    expect(icloud?.category).toBe('cloud_storage');
  });

  it('should include Microsoft 365', () => {
    const ms365 = POPULAR_SERVICES.find((s) => s.id === 'microsoft-365');
    expect(ms365).toBeDefined();
    expect(ms365?.name).toBe('Microsoft 365');
    expect(ms365?.category).toBe('software');
  });

  it('should include Dropbox', () => {
    const dropbox = POPULAR_SERVICES.find((s) => s.id === 'dropbox');
    expect(dropbox).toBeDefined();
    expect(dropbox?.name).toBe('Dropbox');
    expect(dropbox?.category).toBe('cloud_storage');
  });

  it('should include ChatGPT Plus', () => {
    const chatgpt = POPULAR_SERVICES.find((s) => s.id === 'chatgpt-plus');
    expect(chatgpt).toBeDefined();
    expect(chatgpt?.name).toBe('ChatGPT Plus');
    expect(chatgpt?.defaultPrice).toBe(20.0);
    expect(chatgpt?.category).toBe('ai_tools');
  });

  it('should include Gym/Fitness', () => {
    const gym = POPULAR_SERVICES.find((s) => s.id === 'gym-fitness');
    expect(gym).toBeDefined();
    expect(gym?.name).toBe('Gym / Fitness');
    expect(gym?.category).toBe('health_fitness');
  });

  it('should have all services with required fields', () => {
    POPULAR_SERVICES.forEach((service) => {
      expect(service.id).toBeDefined();
      expect(service.id.length).toBeGreaterThan(0);
      expect(service.name).toBeDefined();
      expect(service.name.length).toBeGreaterThan(0);
      expect(service.defaultPrice).toBeGreaterThan(0);
      expect(['monthly', 'annual']).toContain(service.defaultCycle);
      expect(service.category).toBeDefined();
      expect(service.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('should have unique IDs', () => {
    const ids = POPULAR_SERVICES.map((s) => s.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });

  it('should have valid cancellation URLs where provided', () => {
    POPULAR_SERVICES.forEach((service) => {
      if (service.cancellationUrl) {
        expect(service.cancellationUrl).toMatch(/^https?:\/\//);
      }
    });
  });
});
