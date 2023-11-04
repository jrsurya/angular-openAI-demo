import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { ChatGptService } from '../services/chatgpt.service';
import { of } from 'rxjs';
import { ChatMessageModel } from './ChatMessageModel';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatGptService: ChatGptService;

  beforeEach(() => {
    chatGptService = jasmine.createSpyObj('ChatGptService', ['getGPTResponse']);

    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      providers: [
        { provide: ChatGptService, useValue: chatGptService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add user message to chatMessages', () => {
    const userMessage = 'User message';
    const userMessageModel: ChatMessageModel = { text: userMessage, isUser: true };

    component.inputText = userMessage;

    component.onSubmit();

    expect(component.chatMessages).toContain(userMessageModel);
  });

  it('should call chatGptService and add AI response to chatMessages', () => {
    const userMessage = 'User message';
    const aiResponse = 'AI response';
    // Use the correct syntax to set up the spy and return value
    const response = { choices: [{ text: aiResponse }] };
    (chatGptService.getGPTResponse as jasmine.Spy).and.returnValue(of(response));

    component.inputText = userMessage;

    component.onSubmit();

    expect(chatGptService.getGPTResponse).toHaveBeenCalledWith(userMessage);

    const aiMessageModel: ChatMessageModel = { text: aiResponse, isUser: false };
    expect(component.chatMessages).toContain(aiMessageModel);
  });

  it('should not add empty user message', () => {
    component.inputText = '';
    const chatMessagesLength = component.chatMessages.length;

    component.onSubmit();

    expect(component.chatMessages.length).toBe(chatMessagesLength);
  });
});
