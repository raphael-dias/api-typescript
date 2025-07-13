import { describe, expect, test } from '@jest/globals';
import { Request, Response } from 'express';
import { getData } from './data.controller';

jest.mock('../services/data.service', () => ({
  saveData: jest.fn(),
}));

describe('DataController', () => {
  it('retorna status 201 e mensagem de sucesso', async () => {
    const mockReq = {
      body: { value: 1 },
    } as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    const mockRes = {
      status: statusMock,
    } as unknown as Response;

    await getData(mockReq, mockRes);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Valor salvo', value: 1 });
  });
  it('GetData return status 400', async () => {
    const mockReq = {
      body: { value: '' },
    } as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    const mockRes = {
      status: statusMock,
    } as unknown as Response;

    await getData(mockReq, mockRes);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Valor não fornecido' });
  });
});
