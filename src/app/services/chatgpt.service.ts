import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key
  private apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

  constructor(private http: HttpClient) { }

  getGPTResponse(prompt: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.apiKey}`)
      .set('Content-Type', 'application/json');

    const data = {
      prompt,
      max_tokens: 50 // You can adjust this to control the response length
    };

    return this.http.post(this.apiUrl, data, { headers });
  }
}
