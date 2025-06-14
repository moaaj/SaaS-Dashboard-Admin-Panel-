import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { defaultThemes, customThemes, fontOptions, borderRadiusOptions } from '../config/themeConfig';
import { HexColorPicker } from 'react-colorful';

export default function ThemeCustomizer() {
  const { theme, updateTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('colors');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [customTheme, setCustomTheme] = useState({
    ...defaultThemes.light,
    name: 'custom',
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('customTheme');
    if (savedTheme) {
      try {
        setCustomTheme(JSON.parse(savedTheme));
      } catch (error) {
        console.error('Error loading saved theme:', error);
      }
    }
  }, []);

  const handleThemeChange = (themeName) => {
    if (themeName === 'custom') {
      updateTheme(customTheme);
    } else if (customThemes[themeName]) {
      updateTheme({
        ...defaultThemes.light,
        colors: {
          ...defaultThemes.light.colors,
          primary: customThemes[themeName].primary,
        },
        name: themeName,
      });
    } else {
      updateTheme(defaultThemes[themeName]);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setCustomTheme((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        primary: color,
      },
    }));
  };

  const handleFontChange = (font) => {
    setCustomTheme((prev) => ({
      ...prev,
      font: font,
    }));
  };

  const handleBorderRadiusChange = (radius) => {
    setCustomTheme((prev) => ({
      ...prev,
      borderRadius: radius,
    }));
  };

  const handleApplyTheme = () => {
    updateTheme(customTheme);
    localStorage.setItem('customTheme', JSON.stringify(customTheme));
  };

  const handleResetTheme = () => {
    setCustomTheme(defaultThemes.light);
    updateTheme(defaultThemes.light);
    localStorage.removeItem('customTheme');
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('colors')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'colors'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          Colors
        </button>
        <button
          onClick={() => setActiveTab('typography')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'typography'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          Typography
        </button>
        <button
          onClick={() => setActiveTab('spacing')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'spacing'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          Spacing
        </button>
        <button
          onClick={() => setActiveTab('effects')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            activeTab === 'effects'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          Effects
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'colors' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Primary Color
              </label>
              <div className="mt-1">
                <HexColorPicker color={selectedColor} onChange={handleColorChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </label>
                <select
                  value={theme.name}
                  onChange={(e) => handleThemeChange(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="ocean">Ocean</option>
                  <option value="forest">Forest</option>
                  <option value="sunset">Sunset</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Font Family
              </label>
              <select
                value={customTheme.font}
                onChange={(e) => handleFontChange(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {activeTab === 'spacing' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Border Radius
              </label>
              <select
                value={customTheme.borderRadius}
                onChange={(e) => handleBorderRadiusChange(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {borderRadiusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Shadow Style
              </label>
              <select
                value={customTheme.shadow}
                onChange={(e) =>
                  setCustomTheme((prev) => ({ ...prev, shadow: e.target.value }))
                }
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleResetTheme}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Reset to Default
        </button>
        <button
          onClick={handleApplyTheme}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
} 