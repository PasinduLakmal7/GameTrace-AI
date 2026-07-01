export interface UnityEvent {
  time: number;
  type: string;
  x: number;
  y: number;
  z: number;
  score: number;
  value: string;
  screenshotUrl?: string | null;
}

export interface UnitySession {
  projectId: string;
  playerName: string;
  sessionId: string;
  status: string;
  gameVersion: string;
  platform: string;
  deviceModel: string;
  deviceName: string;
  operatingSystem: string;
  processorType: string;
  processorCount: number;
  systemMemorySize: number;
  graphicsDeviceName: string;
  graphicsMemorySize: number;
  screenResolution: string;
  finalScore: number;
  duration: number;
  events: UnityEvent[];
}

export const mockSession: UnitySession = {
  projectId: "proj_traceforge_demo",
  playerName: "NovaStriker",
  sessionId: "sess_8f3a21c9",
  status: "Player Dead",
  gameVersion: "0.4.2",
  platform: "WindowsPlayer",
  deviceModel: "Desktop",
  deviceName: "DEV-MACHINE-01",
  operatingSystem: "Windows 11 (10.0.22621)",
  processorType: "AMD Ryzen 9 5900X 12-Core Processor",
  processorCount: 24,
  systemMemorySize: 32768,
  graphicsDeviceName: "NVIDIA GeForce RTX 3080",
  graphicsMemorySize: 10240,
  screenResolution: "2560x1440",
  finalScore: 150,
  duration: 10.5,
  events: [
    { time: 0.0, type: "SESSION_START", x: 0, y: 1.0, z: 0, score: 0, value: "Shooter Demo Level 1" },
    { time: 1.2, type: "POSITION", x: 1.5, y: 1.0, z: 2.0, score: 0, value: "move_forward" },
    { time: 2.4, type: "POSITION", x: 3.0, y: 1.0, z: 4.5, score: 0, value: "move_forward" },
    { time: 3.1, type: "PLAYER_SHOOT", x: 3.2, y: 1.0, z: 4.8, score: 0, value: "rifle" },
    { time: 3.6, type: "ENEMY_HIT", x: 5.5, y: 1.0, z: 7.0, score: 0, value: "enemy_01 dmg:20" },
    { time: 4.0, type: "POSITION", x: 4.0, y: 1.0, z: 6.0, score: 0, value: "move_forward" },
    { time: 4.8, type: "PLAYER_SHOOT", x: 4.1, y: 1.0, z: 6.2, score: 0, value: "rifle" },
    { time: 5.2, type: "ENEMY_HIT", x: 5.6, y: 1.0, z: 7.2, score: 0, value: "enemy_01 dmg:20" },
    { time: 5.5, type: "ENEMY_DIE", x: 5.6, y: 1.0, z: 7.3, score: 0, value: "enemy_01" },
    { time: 5.6, type: "SCORE_CHANGE", x: 4.2, y: 1.0, z: 6.3, score: 100, value: "+100" },
    { time: 6.4, type: "POSITION", x: 5.0, y: 1.0, z: 8.0, score: 100, value: "move_forward" },
    { time: 7.0, type: "PLAYER_HIT", x: 5.1, y: 1.0, z: 8.2, score: 100, value: "enemy_02 dmg:25" },
    { time: 7.6, type: "PLAYER_HIT", x: 5.2, y: 1.0, z: 8.4, score: 100, value: "enemy_02 dmg:25" },
    { time: 8.1, type: "PLAYER_SHOOT", x: 5.3, y: 1.0, z: 8.5, score: 100, value: "rifle" },
    { time: 8.6, type: "ENEMY_HIT", x: 7.0, y: 1.0, z: 10.0, score: 100, value: "enemy_02 dmg:20" },
    { time: 9.0, type: "PLAYER_HIT", x: 5.5, y: 1.0, z: 8.8, score: 100, value: "enemy_02 dmg:25" },
    { time: 9.4, type: "PLAYER_HIT", x: 5.6, y: 1.0, z: 9.0, score: 100, value: "enemy_02 dmg:25" },
    { time: 9.5, type: "PLAYER_DIE", x: 5.6, y: 1.0, z: 9.0, score: 100, value: "Killed by enemy_02" },
    { time: 10.0, type: "SCORE_CHANGE", x: 5.6, y: 1.0, z: 9.0, score: 150, value: "+50 survival" },
    { time: 10.5, type: "GAME_OVER", x: 5.6, y: 1.0, z: 9.0, score: 150, value: "Defeat" },
  ]
};

export const mockSessionsList = [
  mockSession,
  {
    ...mockSession,
    sessionId: "sess_2b7d40e1",
    playerName: "PixelQueen",
    status: "Completed",
    finalScore: 980,
    duration: 124.5,
    events: [
      { time: 0.0, type: "SESSION_START", x: 0, y: 1.0, z: 0, score: 0, value: "Shooter Demo Level 1" }
    ]
  },
  {
    ...mockSession,
    sessionId: "sess_9c1e55a7",
    playerName: "GhostByte",
    status: "Crashed",
    finalScore: 320,
    duration: 47.8,
    events: [
      { time: 0.0, type: "SESSION_START", x: 0, y: 1.0, z: 0, score: 0, value: "Shooter Demo Level 1" }
    ]
  },
  {
    ...mockSession,
    sessionId: "sess_4d8f22b9",
    playerName: "AcePilot",
    status: "Completed",
    finalScore: 1540,
    duration: 180.2,
    events: [
      { time: 0.0, type: "SESSION_START", x: 0, y: 1.0, z: 0, score: 0, value: "Shooter Demo Level 1" }
    ]
  },
  {
    ...mockSession,
    sessionId: "sess_7a3c99d2",
    playerName: "ShadowFox",
    status: "Player Dead",
    finalScore: 450,
    duration: 65.1,
    events: [
      { time: 0.0, type: "SESSION_START", x: 0, y: 1.0, z: 0, score: 0, value: "Shooter Demo Level 1" }
    ]
  },
  {
    ...mockSession,
    sessionId: "sess_1e4b88c5",
    playerName: "BlazeRunner",
    status: "Completed",
    finalScore: 890,
    duration: 112.4,
    events: [
      { time: 0.0, type: "SESSION_START", x: 0, y: 1.0, z: 0, score: 0, value: "Shooter Demo Level 1" }
    ]
  }
];
