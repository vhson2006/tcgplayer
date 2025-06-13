import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategory } from 'src/news/entities/news-category.entity';
import { CategoryGroup } from './entities/category-group.entity';
import { Category } from './entities/category.entity';
import { I18nService } from 'src/globals/i18n/i18n.service';
import { News } from 'src/news/entities/news.entity';
import { Product } from 'src/product/entities/product.entity';
import { PublicCategoryController } from './public-category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      News, Product,
      NewsCategory, Category, CategoryGroup
    ])
  ],
  controllers: [CategoryController, PublicCategoryController],
  providers: [CategoryService, I18nService],
})
export class CategoryModule {}
