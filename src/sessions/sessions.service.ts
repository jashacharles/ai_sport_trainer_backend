import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { llmgateway } from '@llmgateway/ai-sdk-provider';
import { generateText } from 'ai';

@Injectable()
export class SessionsService {    // request for object rather than text: content of the input: user goal, session wearable data(should be defined in dto ) ,footage link?, user reflection(short text), user body condition(short text),
  async requestModelInference() {
    const { text } = await generateText({
      model: llmgateway('gemini-3.5-flash'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'file',
              data:'place holder',
              mediaType: 'video/mp4',
            },
            {
              type: 'text',
              text: 'Analyze the forehand, the goal is to have better speed and just a bit more spin.',
            },
          ],
        },
      ],
    });

    return { text };
  }

  create(createSessionDto: CreateSessionDto) {
    return 'This action adds a new session';
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
