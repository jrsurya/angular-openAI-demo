import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChatGptService } from './chatgpt.service';

describe('ChatGptService', () => {
  let service: ChatGptService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [ChatGptService],
    });

    service = TestBed.get(ChatGptService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP POST request', () => {
    const mockResponse = { response: 'Mocked response' };
    const prompt = 'Test prompt';

    service.getGPTResponse(prompt).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('https://api.openai.com/v1/engines/davinci/completions');

    expect(req.request.method).toBe('POST');
    expect(req.request.body.prompt).toBe(prompt);

    req.flush(mockResponse);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
