import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { CategoryRequest } from '../classes/CategoryRequest';
import { Endpoints } from '../constants/Endpoints';
import { SubCategoryRequest } from '../classes/SubCategoryRequest';
import { IProductRequest } from '../classes/IProductRequest';
import { IClientRequest } from '../classes/IClientRequest';
import { ISupplierRequest } from '../classes/ISupplierRequest';
import { IStockRequest } from '../classes/IStockRequest';

@Injectable({
  providedIn: 'root',
})
export class PosService {
  baseUrl: string;
  private headers = {
    headers: new HttpHeaders({
      Accept: 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  //#region Category
  createCategory = (data: CategoryRequest) => {
    return this.httpClient.post(
      `${this.baseUrl}${Endpoints.ApiCategory}`,
      data,
      this.headers
    );
  }

  updateCategory = (id: number, data: CategoryRequest) => {
    return this.httpClient.put(
      `${this.baseUrl}${Endpoints.ApiCategory}${id}`,
      data,
      this.headers
    );
  }

  getCategories = () => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiCategory}`,
      this.headers
    );
  }

  getCategoriesById = (id: number) => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiCategory}${id}`,
      this.headers
    );
  }
  //#endregion

  //#region SubCategory
  createSubCategory = (data: SubCategoryRequest) => {
    return this.httpClient.post(
      `${this.baseUrl}${Endpoints.ApiSubCategory}`,
      data,
      this.headers
    );
  }

  updateSubCategory = (id: number, data: SubCategoryRequest) => {
    return this.httpClient.put(
      `${this.baseUrl}${Endpoints.ApiSubCategory}${id}`,
      data,
      this.headers
    );
  }

  getSubCategoriesByCategoryId = (categoryId: number) => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiSubCategory}${categoryId}/category`,
      this.headers
    );
  }

  getSubCategoryId = (id: number) => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiSubCategory}${id}`,
      this.headers
    );
  }

  getSubCategories = () => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiSubCategory}`,
      this.headers
    );
  }
  //#endregion

  //#region Products
  createProduct = (data: IProductRequest) => {
    return this.httpClient.post(
      `${this.baseUrl}${Endpoints.ApiProducts}`,
      data,
      this.headers
    );
  }

  updateProduct = (id: number, data: IProductRequest) => {
    return this.httpClient.put(
      `${this.baseUrl}${Endpoints.ApiProducts}${id}`,
      data,
      this.headers
    );
  }

  getProductsByIdentifier = (identifier: string) => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiProducts}${identifier}`,
      this.headers
    );
  };

  updateProductState = (id: number, state: number) => {
    return this.httpClient.put(
      `${this.baseUrl}${Endpoints.ApiProducts}${id}/${state}`,
      this.headers
    );
  }

  getProducts = (state: string) => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiProducts}${state}/all`,
      this.headers
    );
  };
  //#endregion

  //#region Clients
  createClient = (data: IClientRequest) => {
    return this.httpClient.post(
      `${this.baseUrl}${Endpoints.ApiClients}`,
      data,
      this.headers
    );
  }

  updateClient = (id: number, data: IClientRequest) => {
    return this.httpClient.put(
      `${this.baseUrl}${Endpoints.ApiClients}${id}`,
      data,
      this.headers
    );
  }

  getClient = () => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiClients}`,
      this.headers
    );
  }

  getClientById = (id: number) => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiClients}${id}`,
      this.headers
    );
  }
  //#endregion

  //#region Stock
  createStock = (data: IStockRequest) => {
    return this.httpClient.post(
      `${this.baseUrl}${Endpoints.ApiStock}`,
      data,
      this.headers
    );
  }

  updateStock = (buyId: number, stockId: number, data: IStockRequest) => {
    return this.httpClient.put(
      `${this.baseUrl}${Endpoints.ApiStock}${buyId}/${stockId}`,
      data,
      this.headers
    );
  }
  getAllStock = () => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiStock}stock`,
      this.headers
    );
  }

  getAllBuyes = () => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiStock}buyes`,
      this.headers
    );
  }
  //#endregion

  //#region Supplier
  createSupplier = (data: ISupplierRequest) => {
    return this.httpClient.post(
      `${this.baseUrl}${Endpoints.ApiSupplier}`,
      data,
      this.headers
    );
  };

  updateSupplier = (id: number, data: ISupplierRequest) => {
    return this.httpClient.put(
      `${this.baseUrl}${Endpoints.ApiSupplier}${id}`,
      data,
      this.headers
    );
  }
  getSuppliers = () => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiSupplier}`,
      this.headers
    );
  }
  //#endregion

  //#region Channel
  getChannels = () => {
    return this.httpClient.get(
      `${this.baseUrl}${Endpoints.ApiChannel}`,
      this.headers
    );
  }
  //#endregion
}
