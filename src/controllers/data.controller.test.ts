import { describe, expect, test } from '@jest/globals';
import { Request, Response } from 'express';
import { getData, postData } from './data.controller';
import { retrieveData, saveData } from '../services/data.service';

jest.mock('../services/data.service', () => ({
  retrieveData: jest.fn(),
  saveData: jest.fn(),
}));

describe('DataController - GetData', () => {
  test('retorna status 201 e mensagem de sucesso', async () => {
    const mockData = { value: 'some data' };
    (retrieveData as jest.Mock).mockResolvedValue(mockData);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getData(req, res);

    expect(retrieveData).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Data retrieved successfully',
      data: mockData,
    });
  });
});

describe('DataController - PostData', () => {
  let res: Response;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    jest.clearAllMocks();
  });

  it('retorna 201 se o valor for um número válido', async () => {
    const req = { body: { value: 123 } } as Request;

    await postData(req, res);

    expect(saveData).toHaveBeenCalledWith(123);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Valor salvo', value: 123 });
  });

  it('retorna 400 se o valor for inválido (ex: string)', async () => {
    const req = { body: { value: 'abc' } } as Request;

    await postData(req, res);

    expect(saveData).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid number' });
  });

  it('retorna 500 se saveData lançar um erro conhecido', async () => {
    const req = { body: { value: 10 } } as Request;
    const error = new Error('Erro no banco');
    (saveData as jest.Mock).mockRejectedValue(error);

    await postData(req, res);

    expect(saveData).toHaveBeenCalledWith(10);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Erro interno',
      detail: 'Erro no banco',
    });
  });

  it('retorna 500 se saveData lançar erro desconhecido', async () => {
    const req = { body: { value: 10 } } as Request;
    (saveData as jest.Mock).mockRejectedValue('Erro genérico');

    await postData(req, res);

    expect(saveData).toHaveBeenCalledWith(10);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Erro desconhecido',
    });
  });
});
