import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './interfaces/article.interface';
import { UpdateArticleDto } from './dto/update-article.dto';

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

    async update(id:string, article: UpdateArticleDto){
        const updatedArticle = this.articleModel.findByIdAndUpdate(id, article, { new: true});
       // console.log(updatedArticle);
        return updatedArticle;
    }
}
