import type {NextApiRequest, NextApiResponse} from 'next';
import {getLexRuntime} from '../../utils/aws/lexRuntime';
import {RecognizeTextRequest} from 'aws-sdk/clients/lexruntimev2';
import {getEnv} from '../../utils/helpers/getEnv';

export interface LexResponseSchema {
  messages: Array<{content: string; contentType: string}>;
  intent: {
    confirmationState: string;
    name: string;
    slots: {
      name: {
        value: string;
        interpretedValue: string;
        resolvedValues: string[];
      };
    };
    state: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const botId: string = getEnv('BOT_ID');
  const botAliasId: string = getEnv('BOT_ALIAS_ID');
  const localeId: string = getEnv('BOT_LOCALE_ID');

  const {message} = req.body;
  const sessionId: string = req.cookies.sessionId ?? 'GUEST';
  res.setHeader('Set-Cookie', `sessionId=${sessionId}; Path=/; HttpOnly`);

  const params: RecognizeTextRequest = {
    botId,
    botAliasId,
    text: message,
    localeId,
    sessionId,
  };

  try {
    const {messages, sessionState} = await getLexRuntime
      .recognizeText(params)
      .promise();

    res.status(200).json({
      messages: messages,
      intent: sessionState?.intent ?? null,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
