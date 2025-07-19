import { Request, Response } from 'express';
import { saveData, retrieveData } from '../services/data.service';

export async function getData(req: Request, res: Response) {
  const data = await retrieveData();
  res.status(200).json({ message: 'Data retrieved successfully', data });
}

export async function postData(req: Request, res: Response) {
  const value = req.body?.value;
  if (typeof value !== 'number' || isNaN(value))
    return res.status(400).json({ message: 'Invalid number' });

  try {
    await saveData(value);
    res.status(201).json({ message: 'Valor salvo', value });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Erro interno', detail: error.message });
    }
    return res.status(500).json({ message: 'Erro desconhecido' });
  }
}
