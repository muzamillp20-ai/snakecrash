// Snake Varieties
export interface SnakeVariety {
  id: string;
  name: string;
  headColor: string;
  bodyColor: string;
  eyeColor: string;
  pattern: 'solid' | 'striped' | 'dotted' | 'gradient' | 'rainbow';
  speed: number;
  description: string;
}

export const snakeVarieties: SnakeVariety[] = [
  { id: 'cobra', name: 'King Cobra', headColor: '#2d5a27', bodyColor: '#4a8c3f', eyeColor: '#ff0000', pattern: 'solid', speed: 1, description: 'The deadly King Cobra - Muzamill Bhaiya' },
  { id: 'python', name: 'Rock Python', headColor: '#8B4513', bodyColor: '#D2691E', eyeColor: '#FFD700', pattern: 'striped', speed: 0.8, description: 'The massive Rock Python' },
  { id: 'viper', name: 'Viper', headColor: '#4a0080', bodyColor: '#8a2be2', eyeColor: '#00ff00', pattern: 'dotted', speed: 1.3, description: 'The fast and deadly Viper' },
  { id: 'anaconda', name: 'Green Anaconda', headColor: '#006400', bodyColor: '#228B22', eyeColor: '#ffff00', pattern: 'gradient', speed: 0.7, description: 'The giant Green Anaconda' },
  { id: 'mamba', name: 'Black Mamba', headColor: '#1a1a1a', bodyColor: '#333333', eyeColor: '#ff4500', pattern: 'solid', speed: 1.5, description: 'The fastest Black Mamba' },
  { id: 'boa', name: 'Boa Constrictor', headColor: '#8B0000', bodyColor: '#DC143C', eyeColor: '#FFA500', pattern: 'striped', speed: 0.9, description: 'The powerful Boa Constrictor' },
  { id: 'rainbow', name: 'Rainbow Snake', headColor: '#ff0000', bodyColor: '#00ff00', eyeColor: '#ffffff', pattern: 'rainbow', speed: 1.1, description: 'The magical Rainbow Snake' },
  { id: 'ice', name: 'Ice Serpent', headColor: '#00bfff', bodyColor: '#87ceeb', eyeColor: '#ffffff', pattern: 'gradient', speed: 1.0, description: 'The freezing Ice Serpent' },
  { id: 'fire', name: 'Fire Snake', headColor: '#ff4500', bodyColor: '#ff6347', eyeColor: '#ffff00', pattern: 'dotted', speed: 1.2, description: 'The burning Fire Snake' },
  { id: 'shadow', name: 'Shadow Snake', headColor: '#2c2c54', bodyColor: '#474787', eyeColor: '#ff00ff', pattern: 'solid', speed: 1.4, description: 'The mysterious Shadow Snake' },
  { id: 'golden', name: 'Golden Python', headColor: '#FFD700', bodyColor: '#FFA500', eyeColor: '#8B0000', pattern: 'gradient', speed: 0.85, description: 'The legendary Golden Python' },
  { id: 'emerald', name: 'Emerald Tree Boa', headColor: '#00a86b', bodyColor: '#50C878', eyeColor: '#ff0000', pattern: 'striped', speed: 0.95, description: 'The beautiful Emerald Tree Boa' },
];

// Board Themes
export interface BoardTheme {
  id: string;
  name: string;
  bgColor: string;
  gridColor: string;
  borderColor: string;
  wallPattern: 'none' | 'solid' | 'dashed' | 'glow';
  obstacleColor?: string;
  foodEmoji: string;
  description: string;
}

export const boardThemes: BoardTheme[] = [
  { id: 'jungle', name: 'Jungle Floor', bgColor: '#1a3a1a', gridColor: '#2a4a2a', borderColor: '#4a8c3f', wallPattern: 'solid', foodEmoji: '👧', description: 'Dense jungle terrain' },
  { id: 'desert', name: 'Desert Sands', bgColor: '#4a3520', gridColor: '#5a4530', borderColor: '#c4a35a', wallPattern: 'dashed', foodEmoji: '👧', description: 'Hot desert landscape' },
  { id: 'ocean', name: 'Ocean Floor', bgColor: '#0a1628', gridColor: '#1a2638', borderColor: '#00bfff', wallPattern: 'glow', foodEmoji: '👧', description: 'Deep ocean floor' },
  { id: 'volcano', name: 'Volcanic Rock', bgColor: '#1a0a0a', gridColor: '#2a1a1a', borderColor: '#ff4500', wallPattern: 'glow', foodEmoji: '👧', description: 'Active volcanic terrain' },
  { id: 'ice', name: 'Frozen Tundra', bgColor: '#0a1a2a', gridColor: '#1a2a3a', borderColor: '#87ceeb', wallPattern: 'solid', foodEmoji: '👧', description: 'Frozen icy landscape' },
  { id: 'space', name: 'Outer Space', bgColor: '#0a0a1a', gridColor: '#1a1a2a', borderColor: '#9370db', wallPattern: 'glow', foodEmoji: '👧', description: 'Cosmic space arena' },
  { id: 'cave', name: 'Dark Cave', bgColor: '#0a0a0a', gridColor: '#1a1a1a', borderColor: '#696969', wallPattern: 'solid', foodEmoji: '👧', description: 'Mysterious dark cave' },
  { id: 'garden', name: 'Magic Garden', bgColor: '#1a2a1a', gridColor: '#2a3a2a', borderColor: '#ff69b4', wallPattern: 'dashed', foodEmoji: '👧', description: 'Enchanted garden' },
  { id: 'neon', name: 'Neon City', bgColor: '#0a0a2a', gridColor: '#1a1a3a', borderColor: '#00ff00', wallPattern: 'glow', foodEmoji: '👧', description: 'Cyberpunk neon arena' },
  { id: 'forest', name: 'Ancient Forest', bgColor: '#0a1a0a', gridColor: '#1a2a1a', borderColor: '#228B22', wallPattern: 'solid', foodEmoji: '👧', description: 'Ancient mystical forest' },
];

// Level Configuration
export interface LevelConfig {
  level: number;
  gridSize: number;
  snakeId: string;
  boardId: string;
  speed: number;
  foodRequired: number;
  obstacles: number;
  name: string;
}

export function generateLevels(): LevelConfig[] {
  const levels: LevelConfig[] = [];
  
  for (let i = 1; i <= 100; i++) {
    const snakeIndex = (i - 1) % snakeVarieties.length;
    const boardIndex = (i - 1) % boardThemes.length;
    const gridSize = Math.min(20 + Math.floor(i / 10) * 2, 30);
    const speed = 100 + Math.max(0, 150 - i * 1.5);
    const foodRequired = 5 + Math.floor(i / 3);
    const obstacles = Math.min(Math.floor(i / 5), 15);
    
    const levelNames = [
      'The Beginning', 'First Steps', 'Getting Warmer', 'Snake Trail', 'Jungle Path',
      'Desert Storm', 'Ocean Waves', 'Volcanic Heat', 'Ice Cold', 'Space Odyssey',
      'Dark Passage', 'Garden Maze', 'Neon Lights', 'Forest Deep', 'Cobra Strike',
      'Python Wrap', 'Viper Dash', 'Anaconda Crush', 'Mamba Speed', 'Boa Squeeze',
      'Rainbow Run', 'Ice Slide', 'Fire Dance', 'Shadow Hunt', 'Golden Quest',
      'Emerald Dream', 'Crystal Cave', 'Thunder Peak', 'Moonlight Trail', 'Sunrise Path',
    ];
    
    levels.push({
      level: i,
      gridSize,
      snakeId: snakeVarieties[snakeIndex].id,
      boardId: boardThemes[boardIndex].id,
      speed,
      foodRequired,
      obstacles,
      name: i <= 30 ? levelNames[i - 1] : `Level ${i} - Challenge ${i}`,
    });
  }
  
  return levels;
}

export const allLevels = generateLevels();
