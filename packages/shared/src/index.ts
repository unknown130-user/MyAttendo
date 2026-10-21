export type AttendanceStatus = 'DEBAR RISK' | 'CONDONATION' | 'SAFE' | 'No attendance data';

export interface AttendanceSummary {
  attended: number;
  conducted: number;
  percentage: number;
  status: AttendanceStatus;
  classesNeededToReach75: number;
  maxMissedClassesBeforeDroppingBelow75: number;
  projectedAfterAttendingNextClass: number;
  projectedAfterMissingNextClass: number;
}

export function getAttendanceStatus(attended: number, conducted: number): AttendanceStatus {
  if (!Number.isFinite(attended) || !Number.isFinite(conducted) || conducted < 0 || attended < 0 || attended > conducted) {
    throw new Error('Invalid attendance data.');
  }

  if (conducted === 0) {
    return 'No attendance data';
  }

  const percentage = (attended / conducted) * 100;

  if (percentage < 65) return 'DEBAR RISK';
  if (percentage < 75) return 'CONDONATION';
  return 'SAFE';
}

export function calculateAttendance(attended: number, conducted: number): AttendanceSummary {
  if (!Number.isFinite(attended) || !Number.isFinite(conducted) || conducted < 0 || attended < 0 || attended > conducted) {
    throw new Error('Invalid attendance data.');
  }

  const status = getAttendanceStatus(attended, conducted);
  const percentage = conducted === 0 ? 0 : (attended / conducted) * 100;

  const classesNeededToReach75 =
    conducted === 0
      ? 0
      : Math.max(0, Math.ceil((0.75 * conducted - attended) / 0.25));

  const maxMissedClassesBeforeDroppingBelow75 =
    conducted === 0 ? 0 : Math.max(0, Math.floor((attended - 0.75 * conducted) / 0.25));

  const projectedAfterAttendingNextClass =
    conducted === 0 ? 0 : ((attended + 1) / (conducted + 1)) * 100;

  const projectedAfterMissingNextClass =
    conducted === 0 ? 0 : (attended / (conducted + 1)) * 100;

  return {
    attended,
    conducted,
    percentage,
    status,
    classesNeededToReach75,
    maxMissedClassesBeforeDroppingBelow75,
    projectedAfterAttendingNextClass,
    projectedAfterMissingNextClass,
  };
}

export function validateAttendanceRecord(attended: number, conducted: number): boolean {
  return Number.isFinite(attended) && Number.isFinite(conducted) && attended >= 0 && conducted >= 0 && attended <= conducted;
}
