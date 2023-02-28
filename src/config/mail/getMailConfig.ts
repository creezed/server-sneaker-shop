import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const getMailConfig = async (): Promise<any> => {
  return {
    transport: {
      host: process.env.SMTP_HOST,
      port: process.env.SMPT_PORT,
      secure: true,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    defaults: {
      from: `"SneakerShop" <${process.env.SMPT_USER}>`,
    },
    template: {
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};
