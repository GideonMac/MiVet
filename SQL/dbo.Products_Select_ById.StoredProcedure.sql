USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Products_Select_ById]    Script Date: 11/18/2022 3:12:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Gideon Macapagal
-- Create date: October 19, 2022
-- Description: Get product info by Id.
-- Code Reviewer: Zachary Frappier

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Products_Select_ById]
			@Id int
AS

/*
--------- TEST CODE ----------
DECLARE @Id int = 1;

EXECUTE dbo.Products_Select_ById @Id

SELECT *
FROM dbo.Products
*/

BEGIN

	SELECT p.[Id]
      ,p.[SKU]
      ,p.[Name]
      ,p.[Manufacturer]
      ,p.[Year]
      ,p.[Description]
      ,p.[Specifications]
	  ,pt.[Id] AS ProductTypeId
      ,pt.[Name] AS ProductType
	  ,v.[Id] AS VendorId
	  ,v.[Name] AS Vendor
	  ,v.[Description] AS VendorDesc
	  ,v.[Headline] AS VendorHeadline
      ,p.[IsVisible]
      ,p.[IsActive]
      ,p.[PrimaryImage]
      ,p.[DateCreated]
      ,p.[DateModified]
      ,p.[CreatedBy]
      ,p.[ModifiedBy]
  FROM [dbo].[Products] AS p
		inner join dbo.ProductType AS pt
		ON p.ProductTypeId = pt.Id
 	    inner join dbo.Vendors AS v
	    ON p.VendorId = v.Id

	WHERE p.[Id] = @Id AND p.[IsActive] = 1

END
GO
