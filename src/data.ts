export const RESUME_URL = '/Huzaifa_Ahmad_Resume.pdf'
export const EMAIL = 'huzaifaahmad@uvic.ca'
export const GITHUB_URL = 'https://github.com/Hahmad10'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/huzaifa-ahmad-96604b397'

export type NavLink = { label: string; href: string; external: boolean }

export const NAV_LINKS: NavLink[] = [
  { label: 'EXPERIENCE', href: '#experience', external: false },
  { label: 'PROJECTS', href: '#projects', external: false },
  { label: 'RESUME', href: RESUME_URL, external: true },
  { label: 'GITHUB', href: GITHUB_URL, external: true },
  { label: 'LINKEDIN', href: LINKEDIN_URL, external: true },
  { label: 'CONTACT', href: '#contact', external: false },
]

export const FOCUS = [
  'PCB Design',
  'Embedded C / FreeRTOS',
  'STM32 / RP2040',
  'FPGA / VHDL',
  'Board Bring-up & Test',
  'React / TypeScript',
]

export const HIGHLIGHTS = [
  { value: 'IN ORBIT', label: 'MARMOTSat' },
  { value: 'MACH 2.2', label: 'Andúril-2' },
  { value: '5TH', label: 'Launch Canada 2025' },
]

export type Job = {
  org: string
  role: string
  dates: string
  location: string
  highlight: string
  bullets: string[]
}

export const EXPERIENCE: Job[] = [
  {
    org: 'UVic Satellite Design Club',
    role: 'Hardware Engineer, On-Board Computer',
    dates: 'Aug 2024 – Present',
    location: 'Victoria, BC',
    highlight:
      "Contributed on-board computer hardware to MARMOTSat, a 3U ionospheric research CubeSat built by nearly 60 UVic contributors and launched on SpaceX's Transporter-17 in July 2026.",
    bullets: [
      'Selected 40+ components by checking electrical, power-dissipation, thermal and footprint requirements against manufacturer datasheets, finalizing the on-board computer’s bill of materials for production.',
      'Sourced parts and coordinated with vendors on lead times so the BOM was ready for scheduled fabrication.',
      'Hand-assembled prototype boards by reflow soldering 0805, 0603 and SOIC parts, then verified power rails and signal continuity on the bench before subsystem integration.',
      'Wrote a repeatable assembly and bring-up test procedure that other members used to test later board revisions.',
    ],
  },
  {
    org: 'UVic Rocketry',
    role: 'Software Developer, Ground-Support Telemetry',
    dates: 'Jun 2023 – Present',
    location: 'Victoria, BC',
    highlight:
      'Contributed ground-support telemetry software to Andúril, UVic’s Launch Canada rocket series, including Andúril-2, which placed 5th at Launch Canada 2025 after reaching Mach 2.2 and 32,694 ft.',
    bullets: [
      'Developed the sensor-configuration UI for the ground-support telemetry app in React and TypeScript, used by the avionics team to set parameters for 6 onboard modules, including the IMU, barometer, airbrakes and strain gauges, during pre-launch testing.',
      'Built Material-UI components for the app, including a rocket details view and a module configuration dialog.',
    ],
  },
]

export type Project = {
  title: string
  dates: string
  description: string
  metric: string
  tags: string[]
}

export const PROJECTS: Project[] = [
  {
    title: 'Pipelined CPU Design',
    dates: 'Jan – Apr 2026',
    description:
      'A 16-bit Harvard-architecture CPU in VHDL with a 5-stage pipeline, ALU, 8-register file, hazard detection and a custom instruction set with load/store, branch and immediate instructions. Validated with RTL testbenches and hand-assembled programs running on the board.',
    metric: '50.8 MHz timing closure · 4.4% LUTs',
    tags: ['VHDL', 'Xilinx Vivado', 'Basys-3 FPGA', 'Assembly'],
  },
  {
    title: 'RTOS Traffic Light Controller',
    dates: 'Jan – Apr 2026',
    description:
      'A FreeRTOS simulation of a 4-way intersection on an STM32F4 Discovery board. Four concurrent tasks talk through queues and chained one-shot timers, driving 24 LEDs through 3 daisy-chained shift registers over hardware SPI, with an ADC potentiometer setting the traffic rate.',
    metric: '4 tasks · 3 queues · no missed deadlines in stress tests',
    tags: ['C', 'FreeRTOS', 'STM32F4', 'SPI', 'ADC'],
  },
  {
    title: 'Custom PCB Design',
    dates: 'May – Jun 2026',
    description:
      'A board taken through the full Altium Designer flow: schematic capture, placement, copper pours and routing, with the layer stackup chosen for signal integrity. Built a unified component library with custom symbols and 3D footprints via Ultra Librarian.',
    metric: 'DRC-clean Gerbers, ODB++, BOM and assembly drawings',
    tags: ['Altium Designer', 'PCB Layout', 'DRC', 'BOM'],
  },
  {
    title: 'FM Radio-Clock PCB',
    dates: 'Jan – Apr 2023',
    description:
      'A 2-layer KiCad board built around a Raspberry Pi Pico with an RDA5807 FM tuner, LM386 amplifier, SSD1306 OLED and rotary-encoder controls. Ordered, hand-assembled and brought up with a scope and multimeter, then wrote MicroPython drivers over SPI and I2C for the clock, alarms, FM tuning and menus.',
    metric: 'Schematic → fab → bring-up',
    tags: ['KiCad', 'RP2040', 'MicroPython', 'SPI', 'I2C'],
  },
  {
    title: 'Closed-Loop PWM Controller',
    dates: 'Sep – Dec 2024',
    description:
      'Bare-metal C on an STM32F0 that reads a potentiometer through the ADC and drives a 4N35 optocoupler through the DAC to control an NE555 timer’s frequency in a closed loop. Frequency is measured with timer input capture and interrupts and shown live on an SPI OLED.',
    metric: 'Checked against oscilloscope measurements',
    tags: ['C', 'STM32F0', 'ADC/DAC', 'Timers', 'Interrupts'],
  },
  {
    title: 'AWS DeepRacer',
    dates: 'Nov 2024',
    description:
      'Trained a PPO reinforcement-learning model on SageMaker to drive the re:Invent 2018 track. Iterated on reward design for centerline, speed and steering smoothness, then analyzed the sim-to-real gap on the physical car.',
    metric: '8.596 s simulated lap',
    tags: ['Python', 'TensorFlow', 'PPO', 'AWS SageMaker'],
  },
  {
    title: 'Homelab & Local AI',
    dates: 'Ongoing',
    description:
      'A personal homelab and a VPS that self-host a Jellyfin media server and an Immich photo library, plus a hard drive converted into personal cloud storage. I also run large language models locally on my own hardware.',
    metric: 'Jellyfin · Immich · local LLMs',
    tags: ['VPS', 'Self-hosting', 'Jellyfin', 'Immich', 'Local LLMs'],
  },
  {
    title: 'Medical Diagnosis & Digit Classification',
    dates: 'Sep – Dec 2025',
    description:
      'Logistic regression with Newton’s method for breast cancer diagnosis (569 patients, 30 features), and softmax regression with BFGS on MNIST, comparing raw pixels against HOG features.',
    metric: 'Course project · 10-class MNIST',
    tags: ['MATLAB', 'Regression', 'BFGS', 'HOG'],
  },
]
