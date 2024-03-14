"use client"

import {
  Text,
  Group,
  Card,
  Box,
  Stack,
  Divider,
  LoadingOverlay,
} from "@mantine/core"
import { IconMoodEmpty } from "@tabler/icons-react"
import { Fragment, useEffect } from "react"
import { useQuery } from "urql"

import { vars } from "Theme/artifact/vars.mjs"
import utilStyles from "Theme/util.module.css"

import { usePagination } from "Components/Hooks/use-pagination.ts"
import { PageNavigation } from "Components/PageNavigation.tsx"

import { ReviewsQuery } from "GraphQL/graphql.ts"

import { reviewsQuery } from "Queries/marketplace.ts"

import { asset } from "Services/assets.ts"

import { contentsOrNone } from "Modules/css-utils.ts"
import { formatDateOnly } from "Modules/date.ts"

import { ReviewItem } from "./ReviewItem.tsx"

export const ReviewSection = ({ productID }: { productID: number }) => {
  const {
    limit,
    cursor,
    currentPage,
    isTouched,
    isEmpty,
    nextCursor,
    prevCursor,
    addResult,
  } = usePagination<ReviewsQuery["reviews"]>(5)

  const [{ data, fetching: loading }] = useQuery({
    query: reviewsQuery,
    variables: {
      limit,
      cursor,
      itemID: productID,
    },
  })

  useEffect(() => {
    if (loading == true) return
    if (data?.reviews != null) addResult(data.reviews)
  }, [addResult, data, loading])

  return (
    <Card withBorder>
      <Stack>
        {currentPage.items?.map((item) => (
          <Fragment key={item.ID}>
            <ReviewItem
              name={item.user?.name ?? "-"}
              rating={item.rating}
              comment={item.comment}
              date={formatDateOnly(item.updatedAt)}
              photoURL={asset.mobileUser({ file: item.user?.photoURL })}
              key={item.ID}
            />
            <Divider
              className={utilStyles.hideLastOfType}
              color={vars("color-gray-1")}
            />
          </Fragment>
        ))}
      </Stack>

      <Box display={contentsOrNone(isEmpty || loading)} pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Group p={20} gap={10} justify="center">
          <IconMoodEmpty color={vars("color-gray-5")} />
          <Text fz={18} c={vars("color-gray-5")}>
            Tidak ada ulasan untuk saat ini
          </Text>
        </Group>
      </Box>
      <Box display={contentsOrNone(isTouched && !isEmpty)}>
        <Box p={20}>
          <PageNavigation
            onPrev={prevCursor}
            onNext={nextCursor}
            isPrevDisabled={loading || currentPage.isFirstPage}
            isNextDisabled={loading || currentPage.isLastPage || !isTouched}
          />
        </Box>
      </Box>
    </Card>
  )
}
