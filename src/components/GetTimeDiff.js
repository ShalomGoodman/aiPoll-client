export const getFutureTimeDifference = (timestamp) => {
  // Convert both dates to milliseconds
  const timestampMs = new Date(timestamp).getTime();
  const nowMs = Date.now();

  // Calculate the difference in milliseconds
  let diffMs = timestampMs - nowMs;

  // Return "Final" if the timestamp is in the past
  if (diffMs <= 0) {
    return "Final";
  }

  // Convert time difference from milliseconds to minutes, hours, and days
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Create time difference string
  let diffString = '';
  if (days > 0) diffString += `${days} day${days !== 1 ? 's' : ''} `;
  if (hours > 0) diffString += `${hours} hour${hours !== 1 ? 's' : ''} `;
  if (minutes > 0) diffString += `${minutes} min${minutes !== 1 ? 's' : ''} left`;

  // Remove any extra space at the end
  diffString = diffString.trim();

  return diffString;
};

export const getPrevTimeDifference = (timestamp) => {
  // Convert both dates to milliseconds
  const timestampMs = new Date(timestamp).getTime();
  const nowMs = Date.now();

  // Calculate the difference in milliseconds
  let diffMs = nowMs - timestampMs;

  // Return "Final" if the timestamp is in the past
  if (diffMs <= 0) {
    return "Final";
  }

  // Convert time difference from milliseconds to minutes, hours, and days
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Create time difference string
  let diffString = '';
  if (days > 0) {
    diffString += `${days}d`;
  } else if (hours > 0) {
    diffString += `${hours}h`;
  } else if (minutes > 0) {
    diffString += `${minutes}min`;
  }

  return diffString.trim();
};