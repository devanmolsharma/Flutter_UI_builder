const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

class AICoder {
  static async processCode(parsed_code: string) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0613",
        messages: [
          {
            "role": "system",
            "content": " User is non-coder so you have to write all the code\n\nadd variables as required\n\nreplace comments embedded within the function bodies of Flutter widgets with setstate methods as required.\n\nmake the desired change\n\n Write code necessary to fulfil demands of comments\nadd extra code if necessary to make the app working\n return full code at once"
          },
          {
            "role": "user",
            "content": parsed_code
          },
        ],
        temperature: 1,
        max_tokens: 896,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
    };

    const res = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
    const json = await res.json()
    let code = json.choices[0].message.content as string;
    code = code.replaceAll('```dart','```')
    return code.includes('```') ? code.split('```')[1] : code
  }
}

export default AICoder;