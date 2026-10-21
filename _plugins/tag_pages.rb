# Based on the MIT-licensed jekyll-tagsgenerator 0.0.2, Tomas (2018).
# Preserve existing URLs and paginate without mutating site.tags.
module ScottBlog
  class TagPages < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      per_page = Integer(site.config.fetch("paginate", 10))
      raise ArgumentError, "paginate must be positive" unless per_page.positive?

      site.tags.each do |tag, tag_posts|
        posts = tag_posts.sort_by(&:date).reverse
        slug = tag.downcase.tr(" ", "-")
        pages = (posts.length.to_f / per_page).ceil
        posts.each_slice(per_page).with_index(1) do |slice, number|
          path = "tag/#{slug}"
          path += "/page#{number}" if number > 1
          page = Jekyll::PageWithoutAFile.new(site, site.source, path, "index.html")
          page.data = {
            "layout" => "tag", "title" => "#{tag} posts", "tag" => tag,
            "class" => "tag-template", "sitemap" => true,
            "tag_paginator" => {
              "posts" => slice, "page" => number, "total_pages" => pages,
              "total_posts" => posts.length,
              "previous_page" => (number - 1 if number > 1),
              "next_page" => (number + 1 if number < pages)
            }
          }
          site.pages << page
        end
      end
    end
  end
end
