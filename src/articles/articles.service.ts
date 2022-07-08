import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './interfaces/article.interface';

@Injectable()
export class ArticlesService {
    constructor( @InjectModel('Article') private readonly articleModel: Model<Article> ){}

    async create(createArticleDto : CreateArticleDto) : Promise<Article>{
        const createdArticle = new this.articleModel(createArticleDto)
        return await createdArticle.save()
    }

    async findAll() : Promise<Article[]> {
        return await this.articleModel.find().sort({creationDate: -1}).exec();
    }

    async delete(id:string) : Promise<Article>{
        return await this.articleModel.findByIdAndRemove(id)
    } 
}
