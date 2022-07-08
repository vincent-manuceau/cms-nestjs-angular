import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CheckauthorInterceptor } from 'src/checkauthor.interceptor';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService){}

    @Post()
    @UseInterceptors(CheckauthorInterceptor)
    async createArticle(@Body() createArticleDto:CreateArticleDto){
        return this.articlesService.create(createArticleDto)
    }
    @Get()
    async findAll(){
        return this.articlesService.findAll();
    }
}
