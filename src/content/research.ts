import type { Research } from '@/types/content'

/** Figures are taken from the paper itself. */
export const research: Research = {
  title:
    'Reducing ICU Alarm Fatigue Through a Tiered Lambda Architecture for Real-Time and Historical Vital-Sign Data',
  authors: ['Muhammad Siraj Munir', 'Ahmed Mujhtaba', 'Zeeshan Haider'],
  affiliation:
    'Department of Software Engineering, Foundation University School of Science and Technology, Rawalpindi',
  period: 'Dec 2025 – Jul 2026',
  abstract:
    'Alarm fatigue in intensive care units is a major patient-safety problem: 80 to 99% of monitor alarms are false, which leads to desensitisation and delayed responses. Part of the cause is architectural, because real-time physiological streams are processed separately from historical records and clinical context. The paper proposes a tiered Lambda architecture that combines real-time and batch processing and validates data quality before machine-learning inference. Tested on 5,000 heart-rate records from the MIMIC-III database against a rule-based threshold system, it shows that prioritising data quality and context reduces alarm fatigue more than model complexity alone.',
  results: [
    { value: '37.7%', label: 'fewer false alarms (310 → 193)' },
    { value: '92.6% → 46.1%', label: 'false-positive rate' },
    { value: '0.074 → 0.539', label: 'precision' },
    { value: '1.0', label: 'recall, no real anomaly missed' },
    { value: '25.9%', label: 'corrupted records filtered early' },
    { value: '0.54 ms', label: 'average end-to-end latency per record' },
  ],
  method: [
    'Speed Layer: physiological and temporal validation that discards sensor artefacts in under a millisecond.',
    'Hybrid Layer: contextual anomaly detection with an Isolation Forest model under strict latency limits.',
    'Serving Layer: real-time alerts combined with historical health records in one consistent patient view.',
  ],
  pdf: '/documents/reducing-icu-alarm-fatigue.pdf',
  repo: 'https://github.com/SirajMunir10/Reducing-ICU-Alarm-Fatigue',
}
