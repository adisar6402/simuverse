import React from 'react'

interface SlidersPanelProps {
  gravity: number
  wind: number
  mass: number
  temperature: number
  onParameterChange: (parameter: string, value: number) => void
}

const SlidersPanel: React.FC<SlidersPanelProps> = ({
  gravity,
  wind,
  mass,
  temperature,
  onParameterChange
}) => {
  const SliderControl = ({ 
    label, 
    value, 
    min, 
    max, 
    step, 
    unit, 
    parameter,
    color = 'cyan'
  }: {
    label: string
    value: number
    min: number
    max: number
    step: number
    unit: string
    parameter: string
    color?: 'cyan' | 'magenta'
  }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className={`font-bold ${color === 'cyan' ? 'text-neon-cyan' : 'text-neon-magenta'}`}>
          {label}
        </label>
        <span className="text-white font-mono">
          {value.toFixed(2)} {unit}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onParameterChange(parameter, parseFloat(e.target.value))}
          className={`
            w-full h-2 rounded-full appearance-none cursor-pointer
            ${color === 'cyan' ? 'slider-cyan' : 'slider-magenta'}
          `}
          style={{
            background: color === 'cyan' 
              ? `linear-gradient(90deg, #00ffff 0%, #00ffff ${((value - min) / (max - min)) * 100}%, rgba(0,255,255,0.2) ${((value - min) / (max - min)) * 100}%, rgba(0,255,255,0.2) 100%)`
              : `linear-gradient(90deg, #ff00ff 0%, #ff00ff ${((value - min) / (max - min)) * 100}%, rgba(255,0,255,0.2) ${((value - min) / (max - min)) * 100}%, rgba(255,0,255,0.2) 100%)`
          }}
        />
        
        {/* Custom Slider Thumb Styles */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${color === 'cyan' ? '#00ffff' : '#ff00ff'};
            box-shadow: 0 0 15px ${color === 'cyan' ? 'rgba(0,255,255,0.8)' : 'rgba(255,0,255,0.8)'};
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          input[type="range"]::-webkit-slider-thumb:hover {
            box-shadow: 0 0 25px ${color === 'cyan' ? 'rgba(0,255,255,1)' : 'rgba(255,0,255,1)'};
            transform: scale(1.2);
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${color === 'cyan' ? '#00ffff' : '#ff00ff'};
            box-shadow: 0 0 15px ${color === 'cyan' ? 'rgba(0,255,255,0.8)' : 'rgba(255,0,255,0.8)'};
            cursor: pointer;
            border: none;
          }
        `}</style>
      </div>
    </div>
  )

  return (
    <div className="w-full lg:w-80 glassmorphism border-t lg:border-t-0 lg:border-l border-neon-cyan/30 p-4 lg:p-6 space-y-6 lg:space-y-8 overflow-y-auto max-h-96 lg:max-h-none">
      <div className="text-center">
        <h3 className="text-xl lg:text-2xl font-bold text-glow-cyan mb-2">
          Physics Controls
        </h3>
        <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 lg:space-y-0">
        <SliderControl
          label="Gravity"
          value={gravity}
          min={0}
          max={20}
          step={0.1}
          unit="m/s²"
          parameter="gravity"
          color="cyan"
        />

        <SliderControl
          label="Wind Force"
          value={wind}
          min={0}
          max={50}
          step={0.5}
          unit="m/s"
          parameter="wind"
          color="magenta"
        />

        <SliderControl
          label="Object Mass"
          value={mass}
          min={0.1}
          max={1000}
          step={0.1}
          unit="kg"
          parameter="mass"
          color="cyan"
        />

        <SliderControl
          label="Temperature"
          value={temperature}
          min={-50}
          max={100}
          step={1}
          unit="°C"
          parameter="temperature"
          color="magenta"
        />
      </div>

      {/* Quick Presets */}
      <div className="space-y-4 lg:block hidden">
        <h4 className="text-lg font-bold text-neon-magenta">Quick Presets</h4>
        
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Earth', gravity: 9.81, wind: 0 },
            { name: 'Mars', gravity: 3.71, wind: 25 },
            { name: 'Moon', gravity: 1.62, wind: 0 },
            { name: 'Storm', gravity: 9.81, wind: 40 }
          ].map(preset => (
            <button
              key={preset.name}
              onClick={() => {
                onParameterChange('gravity', preset.gravity)
                onParameterChange('wind', preset.wind)
              }}
              className="p-2 text-xs glassmorphism border border-neon-cyan/30 rounded-lg text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="glassmorphism p-4 rounded-lg border border-neon-magenta/30 lg:block hidden">
        <h5 className="font-bold text-neon-magenta mb-2">Simulation Info</h5>
        <div className="text-sm text-gray-300 space-y-1">
          <p>• Real-time physics simulation</p>
          <p>• Cinematic camera controls</p>
          <p>• Particle effects enabled</p>
          <p>• Audio sync active</p>
        </div>
      </div>
    </div>
  )
}

export default SlidersPanel