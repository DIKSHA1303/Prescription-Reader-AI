# Prescription Reader

Handwritten-style prescriptions are hard to read. **Prescription Reader** takes a photo or typed text of a prescription, extracts the medicine details, and shows them as a clear daily schedule.

> **Disclaimer:** This project is an educational aid, not medical advice. Always confirm medicines, doses and timings with your doctor or pharmacist.

## Features

- Upload a prescription photo (JPG/PNG) or paste typed text
- OCR with [pytesseract](https://github.com/madmaze/pytesseract) (Tesseract)
- LLM-based extraction of medicine, dose, timing and duration
- Schedule table with **Morning / Afternoon / Night** columns and number of days
- Extracted text shown next to the result so errors can be spotted

## How It Works

1. **Input**: user uploads an image or types the prescription text.
2. **OCR**: for images, pytesseract converts the picture to text (after grayscale and contrast clean-up).
3. **LLM extraction**: the text is sent to an LLM with a fixed prompt that returns structured JSON.
4. **Validation**: the JSON is checked against a schema (required fields, numeric days, valid timing values).
5. **Schedule table**: valid entries are rendered as a table.

### Example LLM output

```json
{
  "medicines": [
    {
      "medicine": "Amoxicilina",
      "dose": "500 mg, 1 capsule",
      "morning": true,
      "afternoon": true,
      "night": true,
      "days": 7,
      "notes": "every 8 hours"
    }
  ]
}
```

### Example schedule

| Medicine | Dose | Morning | Afternoon | Night | Days |
| --- | --- | --- | --- | --- | --- |
| Paracetamol | 500 mg, every 6 h if pain/fever | Yes | Yes | Yes | As needed |
| Dipirona Sódica | 500 mg, every 8 h if pain | Yes | Yes | Yes | As needed |
| Amoxicilina | 500 mg, every 8 h | Yes | Yes | Yes | 7 |

## Tech Stack

- Python
- pytesseract + Tesseract OCR
- An LLM API for extraction
- Web front end for upload and results

## Getting Started

### Prerequisites

- Python 3.10+
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) installed and on your PATH
- Tesseract language pack for your prescriptions (e.g. `por` for Portuguese)
- An API key for your chosen LLM provider

### Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Configuration

Create a `.env` file in the project root:

```env
LLM_API_KEY=your_api_key_here
OCR_LANG=eng
```

### Run

```bash
python app.py
```

Then open the local URL shown in the terminal, upload a prescription image, and click **Send**.



