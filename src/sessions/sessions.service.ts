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
              data: 'https://sport-trainer-s3-204303798305-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/3a4d91338ae941c49911377f14399ff8.MOV?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkgwRgIhAIlGcGX%2F%2FzAc0Af00K%2BY5NKcDU6R2TNdp3o%2Fl3BLKy2KAiEA7qkTja12JEG9O9hU0NadHf32IU3Si48%2FKJiOsw5SUV4qvgMIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyMDQzMDM3OTgzMDUiDM9IuKyVpbNIOzOywyqSA8Hftp9QOxGdoFjKbKyKgm1ossSJalA%2BdHm3OgmsPLT4z1QSljUIXyFV4xNVjDUslI4tStOQ3SYNwWeN%2F9SoBcd5IT3L6xPSLM%2FIHRwnSCaoXPvSm8IaVt6H39J3nCy5Wn7P3BuzJPi8jwk62FLbFmSwMs1VCHNhsyaNYDaB4hE6fgUpTIdr59J%2BqmCKi9KrtzheTzm%2Bx%2B6UW8v9aqoXdUcB2xv%2F1W6i%2BCSzkepWs2eFXCE0SQakSR7VL0YmOP1r74Cq728vGgP%2BLzwJ9KobvSI8cDS1bN%2FbYZWFkYhLMHjMMSJhb1Na%2F7MaVjm%2BBHCmd3W20KJcJUit7SgbrXeDP4enWOgcymlPPvXbKpQbbXBZA9Rhe%2BOhsdWXBmJ0Jh4aiGUXwz9qfjCUmhsiYpfSR2Yg6paCnlgpYr3P%2BKAdTk0gWY7kRxptdK0bDm6zeHgrYUdsEtPiIMqFmVvTx7ThAImbeKRufbdg9XFDsZ5XgE8xlmrB85TUE3q9gdyljbuqTqerKiVCcxEC4cHgZ28C2XHzzjCfisnRBjrdAskydCp6hTW4VRFX65TQIELvQNT%2FiaQbGnBqX7B03dWvNamiG7RzXznTvg1Y00MXWqiWs4Q5Pth3AXb%2B5khybMo1xnwjn5%2BrUhHK3BQpq0krX2l7IqMItlHGFfPnBjPD%2FLiVwl6Fd126FDwCOf5D7IjO8tiiR5O7ryX8nvGrhePYg7V1Ib%2BX1qKNzh0crQCNfdCnAn6%2F6zv2evQ%2B%2FbATTlWj%2FcP20BYaoxiJ8TrDPLJVlOgwnOvlmKqxcZ2xOPa%2BqIldeLhpj7Ps%2Ffov7EFvQGPVFcmEXugS6SXnq9DTvNn4Qn47FkoDn8wbaa57bkDWCoNnMSH4YZivoa7AAJ%2F0XwtOS7SGklGm8uGgUR20Rsi4jFlNO9byQA9KzMrqSImw%2FTXHJsvk1qamnBSMOJxNlPzokS3ezPZ08b4YQM7YU9%2BT%2FpZ7UU9MAh7xZHDbAM3Hjd5eZDMIoisMbV03F%2B4%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS7ELUSAQ2A3JVSAM%2F20260617%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20260617T071702Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=ba9482258cd180d1418f5e5605f443d4402f32f1af56855b440b166bb4a85e44',
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
