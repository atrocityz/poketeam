import type { StringValue } from 'ms';

export const expireTimeToMilliseconds = (stringValue: StringValue): number => {
  const match = stringValue.match(/^(\d+)([smhdwMy])$/);

  if (!match) {
    throw new Error(
      `Invalid time format: ${stringValue}. Expected format like '7d', '2h', '30m'`,
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;

    case 'm':
      return value * 60 * 1000;

    case 'h':
      return value * 60 * 60 * 1000;

    case 'd':
      return value * 24 * 60 * 60 * 1000;

    case 'w':
      return value * 7 * 24 * 60 * 60 * 1000;

    case 'M':
      return value * 30 * 24 * 60 * 60 * 1000;

    case 'y':
      return value * 365 * 24 * 60 * 60 * 1000;

    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }
};
