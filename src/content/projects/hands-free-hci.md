---
name: Hands-Free HCI System
description: Control your computer with just a webcam and microphone — no keyboard, no mouse.
year: 2026
status: active
stack: [Python, MediaPipe, OpenCV, Whisper, PyAutoGUI]
github: https://github.com/s3ak6i-dev
---

A system for controlling computers through combined vision and speech inputs, removing the need for physical peripherals. Designed for accessibility and hands-free environments.

The vision layer uses MediaPipe to track hand gestures and facial landmarks in real time. The speech layer runs Whisper locally for command recognition. Both streams are fused by a lightweight coordinator that maps gesture+speech combinations to system actions.

Filed as a patent (Application No. 202641053085) with the Office of the Controller General of Patents, Designs & Trade Marks, India.
